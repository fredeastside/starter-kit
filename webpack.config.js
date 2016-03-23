const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    "./index"
  ],
  /*
  несколько точек входа
  enrty: {
    home: "home",
    about: "about",
  }
  */
  output: {
      path: __dirname + "/dist",
      publicPath: '/assets/',
      //filename: "bundle.[chunkhash].js" // filename: "[name].js" несколько точек входа
      filename: "bundle.js" // filename: "[name].js" несколько точек входа
      // chunkFilename: "[id].[chunkhash].js"
      // library: "[name]" // глобальные переменные
  },
  /*
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 100
  },
  // cdn
  externals: {
    lodash: "_"
  },
  devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : null
  //"cheap-inline-module-source-map" or "eval" in dev, "source-map" in prod
  */
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        //exclude: /node_modules/,
        include: __dirname + "/src"
      },
      {
        test:   /\.styl$/,
        loader: 'style!css!stylus?resolve url'
      }, {
        test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]?[hash]'
      }
    ]
    // noParse:
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // не пересобирать js если возникли ошибки
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })/*,
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    })*/
  ]/*,
  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: __dirname + '/dist'
  }*/
};

if (NODE_ENV === 'production') {
  module.export.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}
