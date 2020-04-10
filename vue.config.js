const argv = JSON.parse(process.env.npm_config_argv) // 获取命令行信息
const publicSassFile = (argv.cooked && argv.cooked[argv.cooked.length - 1] === 'joyous') ? 'theme-joyous' : 'theme'

const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: process.env.BASE_URL, // 默认/
  outputDir: path.resolve(__dirname, `./dist/${process.env.VUE_APP_DIRNAME}`),
  pages: {
    index: {
      entry: 'src/main.js',
      title: '商户对账平台',
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_ROOT,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: `./src/assets/style/${publicSassFile}.scss` // 全局css变量配置
        })
        .end()
    })
  },
  configureWebpack: config => {
    config.devtool = process.env.VUE_APP_DEV_TOOL // 打包模式
    config.plugins.concat(configGzipPack())
    if (process.env.NODE_ENV !== 'development') {
      config.output.filename = 'js/[name].[contenthash:8].js'
      config.output.chunkFilename = 'js/[name].[contenthash:8].js'
    }
  }
}
/**
 * 开启gzip打包
 */
function configGzipPack() {
  if (process.env.NODE_ENV === 'testing') {
    return [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true
      })
    ]
  }
  return []
}