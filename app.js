import express, { json, urlencoded, Router } from 'express';
import { join, dirname } from 'path';
import { middlewares } from './middlewares/index.js'
import { routes } from './routes/index.js'
import { error } from './error/index.js'
import { fileURLToPath } from 'url';

function routeMap(route){
  if(route){
    !route.method && (route.method = "get");
    !(route.callback instanceof Function) && (route.callback = express.static(route.callback));
  }
  return route
}

function middlewareMap(middleware){
  switch (true) {
    case Array.isArray(middleware):
      !(typeof middleware[middleware.length-1] instanceof Function) && (middleware[middleware.length-1] = express.static(middleware[middleware.length-1]))
      break;
  
    default:
      !(typeof middleware instanceof Function) && (middleware = [express.static(middleware)])
      break;
  }

  return middleware
}

function app(params) {

  const
    app = express(),
    __dirname = dirname(fileURLToPath(import.meta.url));

  // view engine setup
  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'pug');

  params.settings.forEach(setting => {console.log('new setting => ', setting.join(" = ")),setting[0]=='view'&&setting[1].slice(0,1)!='/'&&(setting[1]=join(__dirname, setting[1])), app.set(...setting)})
  params.queryHandlers.forEach(queryHandler => {console.log('new queryHandler => ', queryHandler), app.set(...queryHandler)})
  middlewares.call(app.use.bind(app), params.middlewares.map(middlewareMap))
  
  app.use(json());
  app.use(urlencoded({ extended: false }));

  // routes setup
  app.use( '/', routes.call(Router(), params.routes.map(routeMap)) );

  // errors handling
  app.use(error(params.onError))

  return app;

}

export { app }