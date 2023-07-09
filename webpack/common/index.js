const webpack = require('./webpack');
const defineConstants = require('./defineConstants');
const extractText = require('./extractText');

const merged = {
  defineConstants, ...webpack, ...extractText,
};

module.exports = merged;
