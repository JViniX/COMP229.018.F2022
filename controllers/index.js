exports.home = function(req, res, next) {
  res.json(
    {
      success: true,
      message: "This is the home endpoint."
    }
  )
};