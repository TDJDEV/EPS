import express, { json, urlencoded } from 'express';
import { join, dirname } from 'path';
import { routes } from './routes/index.js'
import { error } from './error/index.js'
import { fileURLToPath } from 'url';

function routeMap(route){
  !(route.callback instanceof Function) && (route.callback = express.static(route.callback))
  return route
}
function app(params) {

  const app = express();
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // view engine setup
  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'pug');
  params.settings.forEach(setting => {console.log('new setting => ', setting.join(" = ")), app.set(...setting)})
  params.middlewares.forEach(middleware => {console.log('new middleware => ', middleware), app.use(middleware)})
  
  app.use(json());
  app.use(urlencoded({ extended: false }));

  
  app.use('/', routes( params.routes.map(routeMap) ));

  app.use(error())

  return app;

}

export { app }
