module.exports = (req, res, next) => {
  // grab encrypted cookie
  const userId = req.session.userId;
  console.log("auth middle ware user ID:", userId);
  if (!userId) {
    return res.status(401).json("unathorized request");
  }
  // store user ID in req.boy
  req.body.userId = userId;

  next();
};
