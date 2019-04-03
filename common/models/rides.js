console.log("rides.js is launched");
'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

module.exports = function (Rides) {


  Rides.observe('access', function (ctx, next) {
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    const user = userId ? 'user#' + userId : '<anonymous>';
    // console.log("tom",ctx)
    const modelName = ctx.Model.modelName;
    const scope = ctx.where ? JSON.stringify(ctx.where) : '<all records>';
    // console.log('%s: %s accessed %s:%s', new Date(), user, modelName, scope);
    // console.log("maaayan", ctx)
    next();

  })

  Rides.structure = function (activity, cb) {
      let ChildrenRides = Rides.app.models.ChildrenRides;

    let myRides = [];
    Rides.find({ where: { status: 'structure' } }, function (err, res) {

      res.map(item => {
        let ride = JSON.parse(JSON.stringify(item))

        //here we want to save the stracture children so later we'll create a row for them in children_rides
        let childrenArray = JSON.parse(ride.children);

        //here we manipulate the structure ride so it became duplicatable.
        delete ride.children;
        delete ride.id;
        ride.status = "editing";
        ride.activity = activity;

        //here we create the new rides (the duplicated rides)
        Rides.create(ride, function (err, newRide) {
          if (err) return console.error(err);
          // console.log('Rides created: ', newRide);
          myRides.push(newRide);

          // console.log(childrenArray)
          // now we iterate through the children and for every child we create a new row
          childrenArray.map(child => {
            console.log("child number", child)
            let data = { "rideId": newRide.id, "childId": child, activity: activity }

            ChildrenRides.create(data, function (err, instance) {
              if (err) return console.error(err);
              console.log('children-ride created: ', instance);
            });
          })
        });
      });


    });

    cb(null, myRides);
  }

  Rides.remoteMethod('structure', {
    accepts: { arg: 'activity', type: 'number' },
    returns: { arg: 'res', type: 'array', root: true }
  });

};
