const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    Member = require('../models/member.model');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = require ("./config").secretOrKey;

module.exports = passport => {
  passport.use(
      new JwtStrategy(options, (jwt_payload, done) => {
          Member.findById(jwt_payload.id)
              .then(member => {
              if(member){
                  return done(null, member);
              }
                  return done(null, false);
          }).catch(error => console.log("Error within passport " + error));
    })
  );
};

