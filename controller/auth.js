exports.getIndex = (req, res, next) => {
  res.render("auth/index", { layout: "auth-layouts" });
};
