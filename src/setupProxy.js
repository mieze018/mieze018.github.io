const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    process.env.REACT_APP_api_URI,
    createProxyMiddleware({
      target: process.env.REACT_APP_url,
      changeOrigin: true
    })
  );
};
