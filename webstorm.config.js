'use strict'
/*const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      // '@assets': resolve('src/assets'),
      // '@layouts': resolve('src/layouts'),
      // '@pages': resolve('src/pages'),
      // '@comp': resolve('src/components'),
      // '@api': resolve('src/api'),
      // '@plug': resolve('src/plugins'),
      // '@utils': resolve('src/utils')
    }
  }
}*/

module.exports = {
    resolve: {
        alias: {
            "@": require("path").resolve(__dirname, "src")
        }
    }
};
