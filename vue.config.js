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
      title: '商户对账平台'
    }
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
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader') // 图片压缩,若报错尝试cnpm安装
    //   .options({
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 65
    //     },
    //     optipng: {
    //       enabled: false
    //     },
    //     pngquant: {
    //       quality: [0.65, 0.9],
    //       speed: 4
    //     },
    //     gifsicle: {
    //       interlaced: false
    //     },
    //     webp: {
    //       quality: 75
    //     }
    //   })
    config.resolve.alias
      .set('images', path.join(__dirname, 'src/assets/images'))
      .set('components', path.join(__dirname, 'src/components')) // 设置别名
  },
  configureWebpack: config => {
    config.externals = {
      'vue': 'Vue',
      'element-ui': 'ELEMENT'
    }
    config.resolve = {
      ...config.resolve,
      ...{
        extensions: ['.js', '.vue', '.css', '.scss']
      }
    }
    config.devtool = process.env.VUE_APP_DEV_TOOL // 打包模式
    if (process.env.NODE_ENV === 'testing') {
      config.plugins = [
        ...config.plugins,
        new CompressionPlugin({ // 开启gzip打包
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8
          // deleteOriginalAssets: true
        })
      ]
    }
    if (process.env.NODE_ENV !== 'development') { // 文件输出
      config.output.filename = 'js/[name].[contenthash:8].js'
      config.output.chunkFilename = 'js/[name].[contenthash:8].js'
    }
  }
}
