const default_route = {
  method: 'get',
  path: '/',
  callback(req, res, next) {
    res.render('index', { title: 'Express' });
  }
}

function new_route(router, route_data){
  console.log(route_data)
  router[route_data.method](
    route_data.path,
    route_data.callback
  );
  return router
}

module.exports = routes => (routes.length || routes.push(default_route), routes).reduce(new_route, require('express').Router());
