var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory');
let firebaseAuthController = require('../controllers/firebaseAuth');

/* GET list of items */
router.get('/list', inventoryController.inventoryList);

// Routers for edit
router.put('/edit/:id', firebaseAuthController.requireAuth, firebaseAuthController.isAllowed, inventoryController.processEdit);

// Delete
router.delete('/delete/:id', firebaseAuthController.requireAuth, firebaseAuthController.isAllowed, inventoryController.performDelete);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', firebaseAuthController.requireAuth, inventoryController.processAdd);

module.exports = router;