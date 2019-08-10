const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const fallback = require('express-history-api-fallback');
const proxy = require('../scripts/proxy');

const app = express();

proxy(app);
app.use(expressStaticGzip('build'));
app.use(fallback('index.html', { root: 'build' }));

app.listen(3000);
