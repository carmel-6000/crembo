'use strict';
var assert = require('assert');
const loopback = require('loopback');
const dataSourceConfig = require('../../server/datasources.json');
const ds = new loopback.DataSource(dataSourceConfig['msql']);

module.exports = function (Assistants) {


    Assistants.login = function (ph, dir, cb) {
        let Rides = Assistants.app.models.Rides;
        let res = [];
        Assistatnts.find({
            where: { phone: "0501234678" }
        }), function (err, assistant) {
            if (err) {
                console.log(err)
            }
            Assistants.rides({
                where: {id: assistant.id}
            },function(err, rides) {
                console.log(rides)
            });
        }


        // Rides.find({
        //     where: { and: [{ direction: 'back' }, { activity: { neq: null } }] },
        //     include:
        //     {
        //         relation: 'assistants',
        //         scope: {
        //             where: { id: 3 }
        //         }
        //     }



            //     include: [
            //     {
            //       relation: 'assistants', 
            //       scope: { 
            //           where: {id: 3} 
            //         }
            //     },
            //     {
            //       relation: 'activities', 
            //       scope: { 
            //         where: {isLive: true}
            //       }
            //     },
            //   ]
        // }, function (err, res) {
        //     res.push(res);
        //     console.log(res)
        //     if (err) {
        //         console.log(err)
        //     }
        // });

        cb(null, res);
    }

    Assistants.remoteMethod('login', {
        accepts: [
            { arg: 'phone', type: 'string' },
            { arg: 'direction', type: 'string' },
        ],
        returns: { arg: 'res', type: 'object', root: true }
    });


};
