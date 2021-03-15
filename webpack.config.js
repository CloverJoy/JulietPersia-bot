const path = require('path');

module.exports = {
  entry: __dirname + '/client/index.js',
  module: {
    rules: [
      {
        test: [/\.(jsx|js)$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
   output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  // devtool: 'inline-source-map',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};