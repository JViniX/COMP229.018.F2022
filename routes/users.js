var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/julio', function(req, res, next) {
  res.render('users',  { 
    title: 'Users', 
    name: 'Julio'
  });
});

router.get('/john', function(req, res, next) {
  res.render('users',  { 
    title: 'Users', 
    name: 'John'
  });
});

module.exports = router;
