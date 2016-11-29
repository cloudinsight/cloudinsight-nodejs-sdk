var webpack = require('webpack');
var path = require('path');
var banner = require('fs').readFileSync(path.join(__dirname, 'LICENSE')).toString();

module.exports = {
  entry: './src/index.js',
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  output: {
    filename: 'index.js',
    path: './lib',
    library: 'cloudinsight-sdk',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loaders: ['babel']
      }
    ]
  },
  target: 'node'
}
