var Sails = require('sails');

// create a variable to hold the instantiated sails server
var app;

// Global before hook
before(function (done) {

  // Lift Sails and start the server
  Sails.lift({

    log: {
      level: 'error'
    },

  }, function (err, sails) {
    app = sails;
    done(err, sails);
  });
});

// Global after hook
after(function (done) {
  app.lower(done);
});
