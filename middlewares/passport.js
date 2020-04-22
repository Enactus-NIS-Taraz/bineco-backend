const { SECRET_KEY } = require("../config/config");
const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

const initialize = () => {
    passport.use("jwt", getStrategy());
    return passport.initialize();
};

const authenticate = (req, res, next) => {
    return passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            if (info.name === "TokenExpiredError") {
                return res.status(401).json({
                    message:
                        "Your token has expired. Please generate a new one",
                });
            } else {
                return res.status(401).json({ message: info.message });
            }
        }

        req.user = user;
        return next();
    });
};

const getStrategy = () => {
    const params = {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
    };

    return new Strategy(params, async (payload, done) => {
        await User.findOne({ email: payload.email }, (err, user) => {
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

module.exports = {
    initialize,
    authenticate,
};
