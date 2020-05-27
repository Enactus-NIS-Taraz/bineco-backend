const config = require("../config/config");
const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/User");

const initialize = () => {
  passport.use("jwt", getStrategy());
  return passport.initialize();
};

const getStrategy = () => {
  const params = {
    secretOrKey: config.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  return new Strategy(params, async (payload, done) => {
    await User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: "The user in the token was not found",
        });
      }

      return done(null, user);
    });
  });
};

module.exports = initialize;
