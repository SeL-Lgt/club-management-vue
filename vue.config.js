const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = 'clubManagement';

const port = process.env.port || 8080;

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  // chainWebpack: {
  //
  // },
};
