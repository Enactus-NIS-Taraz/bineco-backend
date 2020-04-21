const { SECRET_KEY } = require("../config/config");
const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

const initialize = () => {
    passport.use("jwt", getStrategy());
};

const authenticate = (callback) =>
    passport.authenticate("jwt", { session: false }, callback);

const getStrategy = () => {
    const params = {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
    };

    return new Strategy(params, async (req, payload, done) => {
        await User.findOne({ username: payload.username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user === null) {
                return done(null, false, {
                    message: "The user in the token was not found",
                });
            }

            return done(null, user);
        });
    });
};

module.exports = {
    initialize,
    authenticate,
};
