var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.module = {
  setup: function(User, config){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      }, function(email, password, done){
        User.findOne({
          email: email.toLowerCase()
        }, function(err, user){
          if(err)
            return done(err);

          if(!user)
            return done(null, false, {
              status: 'Error',
              message: 'This email is not registered'
            });

          user.verifyPasword(password, function(err, isMatched){
            if(err)
              return done(err);

            if(!isMatched)
              return done(err, false, {
                status: 'Error',
                message: 'Password is not correct'
              });

            return done(null, user);
          });
        });
      }
    ));
  }
};
