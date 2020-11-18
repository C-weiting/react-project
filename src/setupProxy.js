const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    proxy.createProxyMiddleware({
      target: 'http://61.132.109.16:8099/',
      changeOrigin: true,
      //   pathRewrite: {
      //     '^/customer': '',
      //   },
    })
  );
};
