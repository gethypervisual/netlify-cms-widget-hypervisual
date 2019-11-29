const ExtractTextPlugin = require("extract-text-webpack-plugin")

function NetlifyCmsWidgetHypervisual (api, options) {

  // Extract CSS
  const extractCSS = new ExtractTextPlugin('styles-for-hypervisual.min.css')

  api.chainWebpack(config => {

    config.use(extractCSS.extract([
      'css-loader',
      'postcss-loader'
    ]))

    console.log(config.toConfig())

  })  
}

NetlifyCmsWidgetHypervisual.defaultOptions = () => ({
  option: 'value'
})

module.exports = NetlifyCmsWidgetHypervisual