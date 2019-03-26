console.log("assistantrrides.js is launched");


'use strict';
var assert = require('assert');
const loopback = require('loopback');
const dataSourceConfig = require('../../server/datasources.json');
const ds = new loopback.DataSource(dataSourceConfig['msql']);

module.exports = function(AssistantsRides) {
    console.log("assist", AssistantsRides)
    AssistantsRides.on('changed', function(inst) {
        console.log('model with id %s has been changed', inst);
        // => model with id 1 has been changed
      });

};
