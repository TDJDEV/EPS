function base(app, json, urlencoded){
  app.set('views', [import.meta.url.replace('app.js','views').slice(10)]),
  app.use(json()),
  app.use(urlencoded({ extended: false }));
  return app
}
export { base }