// const promisify = require('util').promisify;
// const fs = require('fs');
// const readFile = promisify(fs.readFile);


// module.exports = function (app) {

//     let rides = app.models.Rides;

//     rides.get('/api/Rides/+1+'/children_rides', function (req, res) {

//         async function readModels(cb) {

//             // rides.find({ relation: 'children_rides',
//             //                  scope: {
//             //                       fields: ["ride_id", "child_id"]
//             //                         } 
//             //               }, function (err, rides) {
//                 console.log("rides", rides);
//             // });

//             // try {
//             //     const configJson = await readFile('server/model-config.json', 'utf-8');
//             //     list = JSON.parse(configJson);

//             //     let keys = Object.keys(list);
//             //     exposeit = keys.filter(function (key) {
//             //         if (list[key].expose === true) {
//             //             return true;
//             //         } else { return false; }
//             //     });
//                 //esposeit console.log us the models name that the model.config.expose == true. 

//             // } catch (err) {
//             //     cb({});
//             // }
//             // cb(exposeit);


//         }

//         readModels((rides) => {

//             res.setHeader('Content-Type', 'application/json');
//             res.send(JSON.stringify(rides));

//         });

//     });



// }