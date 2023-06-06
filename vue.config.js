const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: { //代理配置
      '/api':{
        target:"https://www.my-site.com" //代理网址
      },
    },
  },
  configureWebpack:require("./webpack.config")
})
module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: 'static',
	parallel: false,
	productionSourceMap: false
}
