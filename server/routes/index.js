const default_route={method: 'get',path: '/',callback(req, res, next){res.sendFile(import.meta.url.replace('server/routes/index.js','views/index.html').slice(10));}}
function routes(routes){return routes.reduce(
  (app, route_data)=>{
    route_data == "demo"&&(route_data=default_route),app.get('/param_demo/:demo',(req,res,next)=>{next()})
    app[route_data.method](route_data.path, route_data.callback);
    console.log('new route added =>',route_data)
    return app
  },
  this
)}
export { routes }
