console.log("rides.js is launched");


'use strict';
var assert = require('assert');
const loopback = require('loopback');
const dataSourceConfig = require('../../server/datasources.json');
const ds = new loopback.DataSource(dataSourceConfig['msql']);

module.exports = function(Rides) {
    Rides.observe('access', function(ctx, next) {
        const token = ctx.options && ctx.options.accessToken;
        const userId = token && token.userId;
        const user = userId ? 'user#' + userId : '<anonymous>';
        console.log("tom",ctx)
        const modelName = ctx.Model.modelName;
        const scope = ctx.where ? JSON.stringify(ctx.where) : '<all records>';
        console.log('%s: %s accessed %s:%s', new Date(), user, modelName, scope);
        // console.log("maaayan", ctx)
        next();
      });
  
      
    };
