const path = require('path');

module.exports = {
    mode: 'development',
    entry: './app/js/main.js',
    output: {
      filename: 'script.js',
      path: __dirname + '/js'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env']
          },
          }
        },
      ],
    },
  };