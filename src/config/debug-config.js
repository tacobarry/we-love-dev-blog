'use strict'

const env = require('../env')
const debug = require('debug')

module.exports = (moduleName) => {
  console.log(`${env.applicationName}:${moduleName}`)
  let _custonDebug = debug(`${env.applicationName}:${moduleName}`)
  
  return function show (message) {
    console.log(message)
    _custonDebug(message)
  }
}
