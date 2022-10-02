const default_access = ['/',__dirname.replace('server\\accesses','demo')]
function accesses(accesses, express){accesses.reduce(
    (app, access_data)=>{
        access_data == "demo"&&(access_data=default_access)
        const static_data=access_data[1]
        typeof static_data === 'string'&&(access_data[1]=express.static(static_data))
        console.log('new access added =>',access_data)
        return app.use(...access_data)
    },
    this
)}
module.exports = accesses