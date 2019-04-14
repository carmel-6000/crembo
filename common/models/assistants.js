'use strict';
var assert = require('assert');
const loopback = require('loopback');
const dataSourceConfig = require('../../server/datasources.json');
const ds = new loopback.DataSource(dataSourceConfig['msql']);

module.exports = function (Assistants) {

    function isLive(assistant) {
        for (let i = 0; i < assistant.rides.length; i++) {
            console.log(assistant.rides);
            if (assistant.rides[i].activities.isLive === 1) {
                return true;
            }
            assistant.rides.splice(i, 1);
        }
    }


    Assistants.login = function (ph, cb) {
        let result = [];
       Assistants.findOne({
            where: { phone: ph },
            include: [
                {
                    relation: 'rides',
                    scope: {
                        include: {
                            relation: 'activities',
                            scope: {
                                where: { isLive: 1 }
                            }
                        }
                    },
                }
            ]
        }, function (err, model) {
            if (err) {
                return cb(err);
            }

            if (model.rides === []) {
                var err = 'Rides for assistant does not exist';
                return cb(err);
            } 
            else {
                result.push(JSON.parse(JSON.stringify(model)));
                cb(null, result.filter(isLive));
            }
        });

    }

    Assistants.remoteMethod('login', {
        accepts: [
            { arg: 'phone', type: 'string', required: true }
        ],
        returns: { arg: 'res', type: 'object', root: true },
        http: {path: '/:phone/login'}
    });


};