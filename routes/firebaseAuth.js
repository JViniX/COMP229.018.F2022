var express = require('express');
var router = express.Router();
let fbAuthController = require('../controllers/firebaseAuth');

router.post('/signup', fbAuthController.signup);

module.exports = router;
