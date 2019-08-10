const express = require('express');
const proxy = require('../scripts/proxy');

module.exports = function(app) {
  proxy(app);
};
