const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

const resolve = dir => {
  return path.join(__dirname, dir)
}
process.env.VUE_APP_TITLE = process.env.VUE_APP_TITLE || '易系统'
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/_handle.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist', // 输出文件目录
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {

    // 开启js、css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }))
    }

    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))

    //svg 配置
    config.module.rules.delete("svg"); //重点：删除默认配置中处理 svg
    config.module.rule('svg-sprite-loader').test(/\.svg$/)
      .include
      .add(path.resolve('./src/assets/svg')) //处理 svg 保存路径
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'  //给 symbo 配置 id
      })

  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },

        // 移除console
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })]
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
      // console.log(config.plugins)

    }
    // let plugins= [
    //   new CopyWebpackPlugin({
    //     patterns: [{ from: path.resolve(__dirname, 'static/model'), to: 'Model' },
    //     { from: path.resolve(__dirname, 'static/assets'), to: 'Image' },
    //     { from: path.resolve(__dirname, 'static/video'), to: 'Video' }
    //     ]
    //   })
    // ]
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        } // 别名配置
      },
      // plugins:plugins
    })


  },

  productionSourceMap: false,

  devServer: {
    port: 8000,
    open: true,
    proxy: {
      ['^' + process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_local_API,
        // ws: true,
        changeOrigin: true,
        pathRewrite: { // 将 blog-api 替换为空，即去掉 blog-api，例如：http://localhost:8080/blog-api/demo替换后为http://localhost:8080/demo
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  }
}
