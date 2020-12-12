const User = require("../models/User");

const auth = async (req, res, next) => {
    try {
      if (req.session.token) {
        User.findOne({ email: req.user.email }, function (err, user) {
          if (user) {
            var x = user.accessToken.indexOf(req.session.token);
            if (x !== -1) {
              next();
            } else {
              res.cookie("token", "");
              res.redirect("/auth/logout");
            }
          } else if (err) {
            res.cookie("token", "");
            res.redirect("/");
          }
        });
      } else {
        res.cookie("token", "");
        res.redirect("/");
      }
    } catch (e) {
      res.redirect("/");
    }
  };

module.exports = auth ;