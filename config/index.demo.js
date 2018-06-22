'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',             //静态资源文件夹
    assetsPublicPath: '/',                    //发布路径
    host: 'localhost',                        // can be overwritten by process.env.HOST
    port: 8080,                               // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,                   //是否自动打开浏览器
    errorOverlay: true,                       //查询错误
    notifyOnErrors: true,                     //通知错误
    poll: false,                              // 跟devserver相关的一个配置
    devtool: 'cheap-module-eval-source-map',  //webpack提供的用来方便调试的配置
    cacheBusting: true,                       //一个配合devtool的配置，当给文件名插入新的hash导致清楚缓存时是否生成souce maps
    cssSourceMap: true,                       //是否开启cssSourceMap
    proxyTable: {                             //跨域处理 
      '/nmis': {  
          target: 'http://192.168.1.156',     //接口域名!后端同学在调试本地时，请将配置修改为你本地的后台API接口地址
          changeOrigin: true,//是否跨域
          pathRewrite: {//地址重写：'/nmis' 替换 target（http://192.168.1.156）
              '^/nmis': '/' 
          }  
      }  
     },     
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'), //编译后index.html的路径
    assetsRoot: path.resolve(__dirname, '../dist'), //打包后的文件根路径
    assetsSubDirectory: 'resource', //静态资源文件夹
    assetsPublicPath: '/', //发布路径
    productionSourceMap: true, //是否开启source-map
    devtool: '#source-map', ///webpack提供的用来方便调试的配置
    productionGzip: false, //是否压缩
    productionGzipExtensions: ['js', 'css'], //设置后会对相应扩展名的文件进行压缩
    bundleAnalyzerReport: process.env.npm_config_report //是否开启打包后的分析报告
  }
}
