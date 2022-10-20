const passport = require('passport');
const User = require('../models/user');

module.exports = function() {
  
  passport.serializeUser((user, done) => {
    console.log('=====> serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, '-password -salt', (err, user) => {
      console.log('=====> deserializeUser');
      done(err, user);
    });
  });

  require('./local')();
};