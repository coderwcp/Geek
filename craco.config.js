const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    configure: webpackConfig => {
      // 修改webpack配置
      whenProd(() => {
        // 排除依赖包
        webpackConfig.externals = {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'redux': 'Redux',
        }
        const { isFound, match } = getPlugin(webpackConfig, pluginByName('HtmlWebpackPlugin'))
        if (isFound) {
          match.userOptions.cdn = {
            js: [
              "https://cdn.bootcdn.net/ajax/libs/react/18.1.0/umd/react.production.min.js",
              "https://cdn.bootcdn.net/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js",
              "https://cdn.bootcdn.net/ajax/libs/redux/4.2.0/redux.min.js",
            ]
          }
        }
      })

      return webpackConfig;
    }
  }
}
