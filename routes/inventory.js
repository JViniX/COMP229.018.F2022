var express = require('express');
let passport = require('passport');
var router = express.Router();

let inventoryController = require('../controllers/inventory');


/* GET list of items */
router.get('/list', inventoryController.inventoryList);

// Routers for edit
router.put('/edit/:id', passport.authenticate('tokencheck', { session: false }), inventoryController.processEdit);

// Delete
router.delete('/delete/:id', passport.authenticate('tokencheck', { session: false }), inventoryController.performDelete);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', passport.authenticate('tokencheck', { session: false }), inventoryController.processAdd);

module.exports = router;