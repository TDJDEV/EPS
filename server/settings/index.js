function settings(settings){settings.forEach(setting => {console.log('new set added => ', setting), this.set(...setting)})}
export { settings }