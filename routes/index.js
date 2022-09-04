const default_route = {
  method: 'get',
  path: '/',
  callback(req, res, next) { res.render('index', { title: 'EPS' }); }
}

function new_route(router, route_data){
  route_data == "demo" && (route_data = default_route)
  console.log('new route =>',route_data)
  router[route_data.method](route_data.path, route_data.callback);
  return router
}

const routes = function(routes){return routes.reduce(new_route, this)}
export { routes }
