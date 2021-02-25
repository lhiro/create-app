import { defineConfig } from 'umi';
const isEnv = process.env.NODE_ENV === 'development';

export default defineConfig({
  antd: false,
  history: {
    type: 'hash'
  },
  publicPath: isEnv ? '/' : 'http://',
  dynamicImport: {},
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      'target': 'http://localhost:7100/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/login' },
  ],
  chainWebpack: function (config, { webpack }) {
    // 设置后不存在缓存
    // config.output.set('chunkFilename', '[name]_[hash:5].js');
    // config.output.set('filename', '[name]_[hash:5].js');
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '-',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }:any) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      }
    });
  //  !isEnv &&  config.plugin('webpack-aliyun-oss-plugin').
  //  use(require('webpack-aliyun-oss-plugin'), [{
  //    buildPath: 'dist/**',
  //    region: 'oss-cn-shenzhen',
  //    ak: '',
  //    sk: '',
  //    bucket: '',
  //  }])
  },
});

