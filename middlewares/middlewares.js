const { session } = require("passport");

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  sessionId = req.session;
  if (req.user)
    if (req.user.isActive) {
      return next();
    } else if (sessionId.userId) {
      return next();
    }
  req.flash("error", "You need to Log-In");
  res.redirect("/login");
};

middlewareObj.hasAdminPrivs = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) {
      return next();
    }
  }
  req.flash("error", "You need admin privilages");
  res.redirect("/login");
};

module.exports = middlewareObj;
