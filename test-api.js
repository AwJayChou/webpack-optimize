const glob = require('glob-all')
const path = require('path')
const list = glob.sync(path.resolve(__dirname, './src/**/*.html'))
console.log(' list ', list)