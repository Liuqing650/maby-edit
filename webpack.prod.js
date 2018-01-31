const webpack = require('webpack');
const packageJSON = require('./package.json');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let libraryName = 'maby-editor';

let plugins = [];

console.log('✅ 当前是 发布 模式');

plugins.push(new UglifyJsPlugin({ minimize: true }));
plugins.push(new CleanWebpackPlugin(['dist', 'lib']));
console.log(' ./dist， ./lib 目录已删除，正在创建发布版本 %s', packageJSON.version);
let config = {
  entry: {
    'maby-editor': __dirname + '/src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: libraryName + '.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      './'
    ],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', "stage-0"]
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader', 
          'less-loader'
        ]
      },
    ]
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    },
    'react-dom/server': {
      'commonjs': 'react-dom/server',
      'commonjs2': 'react-dom/server',
      'amd': 'react-dom/server',
      'root': 'ReactDOMServer'
    }
  },
  plugins: plugins
};
module.exports = config;