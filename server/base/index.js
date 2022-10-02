function base(app, json, urlencoded){
  app.set('views', [__dirname.replace('server\\base','views')]),
  app.use(json()),
  app.use(urlencoded({ extended: false }));
  return app
}
module.exports = base