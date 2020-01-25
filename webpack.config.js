const path = require(`path`);
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public/js`),
    publicPath: "/js/",
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`)
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin(),
  ]
};
