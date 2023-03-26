// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    productionSourceMap: false,
    publicPath: './',
    transpileDependencies: true,
    // devServer: {
    //     proxy: {
    //         '^/api': {
    //             target: 'http://localhost:8080/',//接口的前缀
    //             ws: true,//代理websocked
    //             changeOrigin: true,//虚拟的站点需要更管origin
    //         }
    //     }
    // },
    chainWebpack: (config) => { 
        //设置index.html  的title   
        config.plugin('html').tap(args => {
          args[0].title = '微心愿爱心商城'
          return args
        })
        },
        productionSourceMap: false,
        // configureWebpack: config => {
        //     config.plugins.push(new CompressionWebpackPlugin({
        //       algorithm: 'gzip', // 使用gzip压缩
        //       test: /\.js$|\.html$|\.css$/, // 匹配文件名
        //       filename: '[path][base].gz', // 压缩后的文件名(保持原文件名，后缀加.gz)
        //       minRatio: 1, // 压缩率小于1才会压缩
        //       threshold: 10240, // 对超过10k的数据压缩
        //       deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
        //     }));
        // }
})
