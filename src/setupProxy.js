import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    'https://api.tumblr.com/v2/blog/mieze018.tumblr.com/',
    createProxyMiddleware({
      target: 'https://www.mieze018.net/',
      changeOrigin: true
    })
  );
};
