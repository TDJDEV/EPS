import { www } from './www/index.js'

const server_data = {
  routes:   [],
  accesses: [],
  settings: [],
  middlewares: [],
}
const EPS = {
  // Getters
  get port(){ return server_data.port },

  // Setters
  set port(n) { server_data.port = n },

  // Methods
  route (...routes_data) { routes_data.forEach(route_data => route_data && server_data.routes.push(route_data) ) },
  use (...middlewares_data) { middlewares_data.forEach(middleware_data => middleware_data && server_data.middlewares.push(middleware_data) ) },
  set (...params) {
    function add_settings(setting){
      setting.length && (server_data.settings.push(setting))
    }
    Array.isArray(params[0]) ? params.forEach(add_settings) : add_settings(params)
  },
  webSocket(WS){ server_data.webSocket = WS },
  run() {
    Object
      .entries(www(server_data))
      .forEach( function([key,val]) { server_data[key] = val })
  },
}
export { EPS }