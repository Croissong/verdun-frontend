var express = require('express');
var proxy = require('http-proxy-middleware');
var fallback = require('express-history-api-fallback');
var expressStaticGzip = require('express-static-gzip');

const proxyHost = 'https://verdun.patrician.gold/';

// proxy middleware options
var options = {
  target: proxyHost,
  // logLevel: 'debug',
  ws: true,
  changeOrigin: true,
  secure: false,
  logLevel: 'debug'
};

// create the proxy (without context)
var exampleProxy = proxy(['/metrics'], options);

// mount `exampleProxy` in web server
var app = express();
app.use(exampleProxy);
app.use(expressStaticGzip('public'));
app.use(fallback('index.html', { root: 'public' }));
app.listen(9000);
