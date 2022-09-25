#!/usr/bin/env node

/* Module dependencies. */
import { app } from '../app.js';
import debug from 'debug';
import http from 'http';

function www (params = {}, plugin, port_number) { return (app => {
    /* Get port from environment and store in Express. */
    const port = normalizePort(process.env.PORT || app.get('port') || port_number);
    app.set('port', port);
  
    /* Create HTTP server. */
    const server = http.createServer(app);
    plugin.webSocket && plugin[0].webSocket.attach(server)
  
    /* Listen on provided port, on all network interfaces. */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  
    /* Normalize a port into a number, string, or false. */
    function normalizePort(val) {
      const port = parseInt(val, 10);
      switch (true) {
        case isNaN(port): return val;  // named pipe
        case (port >= 0): return port; // port number
        default: false;
      }
    }
  
    /* Event listener for HTTP server "error" event. */
    function onError(error) {
      if (error.syscall !== 'listen') { throw error; }
      const bind=typeof port==='string'?'Pipe '+port:'Port '+port;
  
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES': console.error(bind + ' requires elevated privileges'), process.exit(1);
        case 'EADDRINUSE': console.error(bind + ' is already in use'), process.exit(1);
        default: throw error;
      }
    }
  
    /* Event listener for HTTP server "listening" event. */
    function onListening() {
      const addr = server.address();
      const bind=typeof addr==='string'?'pipe '+addr:'port '+addr.port;
      debug(`${process.env.npm_package_name}:server`)('Listening on ' + bind);
    }
    
    return { port }
    
  })(app(params))}
export { www }