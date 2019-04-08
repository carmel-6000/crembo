'use strict';
var assert = require('assert');
const loopback = require('loopback');
const dataSourceConfig = require('../../server/datasources.json');
const ds = new loopback.DataSource(dataSourceConfig['msql']);

module.exports = function(Assistants) {


    Assistants.login = function (phone, dir, cb) {
        let Rides = Assistants.app.models.Rides;
        let res = [];
        Rides.find({ 
            where: {direction: dir},
            include: [
            {
              relation: 'assistants', 
              scope: { 
                  where: {phone: phone} 
                }
            },
            {
              relation: 'activities', 
              scope: { 
                where: {isLive: true}
              }
            }
          ]
          }, function (err, res) {
            res.push(res);
        });

      cb(null, res);
    }
  
    Assistants.remoteMethod('login', {
      accepts:[
        {arg: 'phone', type: 'string'},
        {arg: 'direction', type: 'string'},
        ],
      returns: { arg: 'res', type: 'object', root: true }
    });
  
  
};
