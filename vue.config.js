const path = require('path')

const argv = JSON.parse(process.env.npm_config_argv) // 获取命令行信息
let publicScssFile = 'theme'
if (argv.cooked && argv.cooked[argv.cooked.length - 1] === 'joyous') {
  publicScssFile = 'theme-joyous'
}

module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: `./src/assets/style/${publicScssFile}.scss`,
        })
        .end()
    })
  }
}