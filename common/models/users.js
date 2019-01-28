console.log("user.js is launched");
/*
users.js

1. we copy all stuff inside client_items.js but the function fubdByClient will be empty with the callback (cb())
2. we open /explorer and make sure that inside /User we see the new remote method /getAvailableModels
3. we need to open a file (model-config.json) 

*/


'use strict';
var assert = require('assert');

//const dataSourceConfig = require('../datasources.json');
const loopback = require('loopback');
const dataSourceConfig = require('../../server/datasources.json');
const ds = new loopback.DataSource(dataSourceConfig['msql']);


const findObjByKeys = function (arr, keysArr) {

    //[{key:'store',value:'ebay'},{key:'native_id',value:item.id}]
    //console.log("find obj by keys is launched");


    let noMatch = false;
    let foundObj = null;
    arr.forEach(entry => {

        noMatch = false;

        //console.log("\n\nEntry:",entry);
        keysArr.forEach(keyEntry => {


            //console.log("Looking for entry["+keyEntry.key+"] that is equals to "+keyEntry.value);
            if (entry[keyEntry.key] && entry[keyEntry.key] == keyEntry.value) {
                //console.log("~~~~~~~~~~~~~~~~Found");
            } else {
                noMatch = true;
            }

        });

        if (!noMatch) {
            foundObj = entry;
        }


    });

    return foundObj;


}

//var DataSource = require('loopback-datasource-juggler').DataSource;
//var ds = new DataSource('mysql');

module.exports = function (User) {

    User.getAvailableModels = function (where, cb) {

        console.log("something", cb, where)
        //link=findObjByKeys(re,[{key:'store',value:store},{key:'native_id',value:item.id}]);
    }
    User.remoteMethod('getAvailableModels', {
        http: {
            verb: 'get'
        },
        returns: { arg: 'res', type: 'object', root: true }
    });

};
