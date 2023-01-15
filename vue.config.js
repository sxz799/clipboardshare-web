const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'appleIcon.png',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  publicPath: "/static", //加上这一行即可
  devServer: {
    port: 4000,
    proxy: {
      '/clipboard': {
        ws: false,
        target: "http://d.sxz799.fun:3000",
        changeOrigin: true
      }
    }
  },

})
