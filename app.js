const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
function routeMap(route){
  !(route.callback instanceof Function) && (route.callback = express.static(route.callback))
  return route
}

module.exports = (params) => {


  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  for(const setting of params.settings) app.set(...setting)
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  app.use('/', require('./routes')( params.routes.map(routeMap) ));

  app.use(require('./error')())

  return app;

}
