import { www } from './www/index.js'

// const serverData = {
//   appName: "EPS",
//   routes:   [],
//   accesses: [],
//   settings: [],
//   middlewares: [],
//   queryHandlers: [],
// }
class EPS {
  #serverData

  constructor(){
    this.#serverData = {
      appName: "EPS",
      routes:   [],
      accesses: [],
      settings: [],
      middlewares: [],
      queryHandlers: [],
    }
  }

  param (...params) {
    const addQueryHandler = (setting) => { setting.length && (this.#serverData.queryHandler.push(setting))}
    Array.isArray(params[0]) ? params.forEach(addQueryHandler) : addQueryHandler(params)
  }

  route (...routes_data) { routes_data.forEach(route_data => route_data && this.#serverData.routes.push(route_data) ) }

  use   (...middlewares_data) { middlewares_data.forEach(middleware_data => middleware_data && this.#serverData.middlewares.push(middleware_data) ) }

  set   (...params) {
    const addSettings = (setting) => { setting.length && (this.#serverData.settings.push(setting)) }
    Array.isArray(params[0]) ? params.forEach(addSettings) : addSettings(params)
  }

  webSocket(WS){ this.#serverData.webSocket = WS }

  run() { Object.entries(www(this.#serverData)).forEach( ([key,val]) => { this[key] = val }) }

}
// const EPS = {
//   // Getters
//   get port(){ return serverData.port },

//   // Setters
//   set port(n) { serverData.port = n },

//   // Methods
//   param (...params) {
//     const addQueryHandler = (setting) => { setting.length && (this.#serverDataQueryHandler.push(setting))}
//     Array.isArray(params[0]) ? params.forEach(addQueryHandler) : addQueryHandler(params)
//   },
//   route (...routes_data) { routes_data.forEach(route_data => route_data && serverData.routes.push(route_data) ) },
//   use   (...middlewares_data) { middlewares_data.forEach(middleware_data => middleware_data && serverData.middlewares.push(middleware_data) ) },
//   set   (...params) {
//     const addSettings = (setting) => { setting.length && (this.#serverData.settings.push(setting)) }
//     Array.isArray(params[0]) ? params.forEach(addSettings) : addSettings(params)
//   },
//   webSocket(WS){ serverData.webSocket = WS },
//   run() {
//     Object
//       .entries(www(serverData))
//       .forEach( ([key,val]) => { this[key] = val })
//   },
// }
export { EPS }
