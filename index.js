const server_data = {
  routes:   [],
  accesses: [],
  settings: [],
}
module.exports = {
  // Getters
  get port(){ return server_data.port },
  
  // Setters
  set port(n) { server_data.port = n },

  // Methods
  add_route (...routes_data) { routes_data.forEach(route_data => route_data && server_data.routes.push(route_data) ) },
  set (...params) {
    function add_settings(setting){
      setting.length && (server_data.settings.push(setting))
    }
    Array.isArray(params[0]) ? params.forEach(add_settings) : add_settings(params)
  },
  webSocket(WS){ server_data.webSocket = WS },
  run() {
    Object
      .entries(require('./www')(server_data))
      .forEach( function([key,val]) { server_data[key] = val })
  },
}