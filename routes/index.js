var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');

/* GET home page. */
router.get('/', controlerIndex.home);

/* GET About page avaulable on http://localhost:3000/about . */
router.get('/about', controlerIndex.about);

/* GET Projects page. */
router.get('/projects', controlerIndex.projects);

module.exports = router;