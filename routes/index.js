const default_route = {
  method: 'get',
  path: '/',
  callback(req, res, next) { res.render('index', { title: 'EPS' }); }
}

function new_route(router, route_data){
  console.log('new route =>',route_data)
  router[route_data.method](route_data.path, route_data.callback);
  return router
}

const routes = function(routes){
  return (routes.length || routes.push(default_route), routes).reduce(new_route, this);
}
export { routes }
