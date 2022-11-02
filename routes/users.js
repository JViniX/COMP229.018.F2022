let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

/* GET users listing. */
router.post('/signup', usersController.signup);

router.post('/signin', usersController.signin);

// router.get('/signout', usersController.signout);

module.exports = router;
