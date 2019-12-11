const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/v1',
    proxy({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );

  app.use(
    '/ws',
    proxy({
      target: 'https://viacep.com.br',
      changeOrigin: true,
    })
  );
};