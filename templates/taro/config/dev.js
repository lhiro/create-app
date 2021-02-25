const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  env: {
    NODE_ENV: '"production"',
    API_ROOT: '"https://api"',
  },
  defineConstants: {
  },
  plugins: [
    // '@tarojs/plugin-mock'
  ],
  mini: {
    // webpackChain(chain) {
    //   chain.mode('production')
    //   chain.optimization.minimize(true);
    //   chain.plugin("terser").use(TerserPlugin, [
    //     {
    //       cache: true,
    //       extractComments: false,
    //       terserOptions: {
    //         output: {
    //           comments: false
    //         }
    //       }
    //     }
    //   ]);
    // }
  },
  h5: {}
}