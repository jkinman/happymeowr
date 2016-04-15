'use strict';
var exports = module.exports = {};
var express = require('express');
var app = express();

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'Xl-Fu3VgSH347wuaGudkPA',
  consumer_secret: '_Z-eP5uOy2b1c2cc0l5LyaW_IHU',
  token: 'NMLuRkyVpNOz4Ydcqsoky7wmao9H08qe',
  token_secret: '7YHP0BPxvRR3XSqRSsBK4eMTS7k',
});
