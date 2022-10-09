var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/julio', function(req, res, next) {
  res.render(
    'users', 
    { 
      title: 'Julio', 
      name: 'Julio' 
    }
  );
});

router.get('/john', function(req, res, next) {
  res.render(
    'users', 
    { 
      title: 'John Smith', 
      name: 'John Smith' 
    }
  );
});

module.exports = router;
