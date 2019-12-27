module.exports = function(req, res, next) {
  console.log("inside admin auth");
  console.log("req.session :", req.session);
  if (req.session.user.user_role === 1) {
    console.log(" session verified");
    console.log("req.session :", req.session);
    next();
  } else {
    console.log(" no session");
    res.status(403).send("unAuthorised");
  }
};
