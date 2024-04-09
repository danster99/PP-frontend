const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    devMiddleware: {
      publicPath: '/',
      writeToDisk: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      client: {
        overlay: false,
      }
    },
    allowedHosts: 'all',
  },
})