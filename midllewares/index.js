function new_middleware(acc, middleware_data){
    console.log('new middleware =>',middleware_data)
    return acc(...middleware_data)
}

const middlewares = function(middlewares){ middlewares.reduce(new_middleware, this) }
export { middlewares }