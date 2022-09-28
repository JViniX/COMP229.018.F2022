var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/julio', function(req, res, next) {
  res.send('Welcome Julio!');
});

module.exports = router;
