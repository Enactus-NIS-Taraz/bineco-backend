const passport = require("passport");

const authenticate = (req, res, next) => {
  try {
    return passport.authenticate(
      "jwt",
      { session: false },
      (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          if (info.name === "TokenExpiredError") {
            return res.status(401).json({
              message: "Your token has expired. Please generate a new one",
            });
          } else {
            return res.status(401).json({ message: info.message });
          }
        }

        req.user = user;
        return next();
      }
    )(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message || "Произошла какая-та ошибка",
    });
  }
};

module.exports = {
  authenticate,
};
