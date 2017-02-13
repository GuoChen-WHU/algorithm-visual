module.exports = {
  devtool: 'source-map',
  entry: __dirname + '/core/index.js',
  output: {
    path: __dirname + '/core/dest',
    filename: 'algorithm-core.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: 'eslint-loader'
      }
    ]
  }
};
