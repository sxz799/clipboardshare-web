const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath: "/static", //加上这一行即可
  devServer: {
    port: 4000,
    proxy: {
      '/clipboard': {
        ws: false,
        target: "http://127.0.0.1:3000",
        changeOrigin: true
      }
    }
  },
})
