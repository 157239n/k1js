
// webpack.config.js

import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

export default [{
  entry: './built/index.js', // Entry point of your application
  output: {
    filename: 'umd.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'k1js',
    libraryTarget: 'umd',
  	publicPath: '',
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "ts-loader"},
      {test: /\.js$/, loader: "source-map-loader"},
    ]
  },
  mode: "production",
},{
  entry: './built/index.js', // Entry point of your application
  output: {
    filename: 'amd.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'k1js',
    libraryTarget: 'amd',
  	publicPath: '',
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "ts-loader"},
      {test: /\.js$/, loader: "source-map-loader"},
    ]
  },
  mode: "production",
}];



