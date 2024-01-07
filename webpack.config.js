
// webpack.config.js

import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

export default [{
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'umd.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'k1js',
    libraryTarget: 'umd',
  	publicPath: '',
  },
  mode: "production",
},{
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'amd.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'k1js',
    libraryTarget: 'amd',
  	publicPath: '',
  },
  mode: "production",
}];



