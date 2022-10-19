// Student ID: 1234568796
// Name: Julio Vinicius
// Data: Oct 01, 2022

var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.home);

// Renders the projects page
router.get('/projects', indexController.projects);

router.get('/about', function(req, res, next) {
  res.render(
    'index', 
    { 
      title: 'About Me',
      name: 'Julio' 
    }
  );
});

router.get('/contact', function(req, res, next) {
  res.render(
    'index', 
    { 
      title: 'Contact',
      name: 'Julio' 
    }
  );
});

module.exports = router;