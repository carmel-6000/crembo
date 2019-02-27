'use strict';
var assert = require('assert');
const loopback = require('loopback');
const dataSourceConfig = require('../../server/datasources.json');
const ds = new loopback.DataSource(dataSourceConfig['msql']);

module.exports = function(Rides) {

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
