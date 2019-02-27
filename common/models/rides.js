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
    
        const modelName = ctx.Model.modelName;
        const scope = ctx.where ? JSON.stringify(ctx.where) : '<all records>';
        console.log('%s: %s accessed %s:%s', new Date(), user, modelName, scope);
        // console.log("maaayan", ctx)
        next();
      });
  
      Rides.on('changed', function(obj) {
        console.log('the model is', obj);
        // => model with id 1 has been changed
      });
      

// get rides, include activities, assistants
//1. filter ride where direction={outputDirection}
//2. filter ride where activity > isLive=true.
//3. filter ride where assistant > phone={outputPhone}
//4. return the rideObject. 

    Rides.findAssistant = function (phone, direction, cb) {
        //phone = 0509939503
        //direction = back

        
        cb(null, obj);

        // console.log("something", cb, where)
    }
    Rides.remoteMethod('findAssistant', {
        accepts: [
            {arg: 'direction', type: 'string'},
            {arg: 'phone', type: 'number'}
        ],
        returns: {arg: 'ride', type: 'object'}
    });

};
