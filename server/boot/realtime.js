var es = require('event-stream');
module.exports = function(app) {

    
  var Rides = app.models.Rides;
  Rides.createChangeStream(function(err, changes) {
  changes.pipe(es.stringify()).pipe(process.stdout);
  });

}