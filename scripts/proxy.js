const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/metrics',
    proxy({
      target: 'https://verdun.patrician.gold',
      changeOrigin: true
    })
  );
  app.use(
    '/api',
    proxy({
      target: 'https://verdun.patrician.gold',
      changeOrigin: true
    })
  );
};
