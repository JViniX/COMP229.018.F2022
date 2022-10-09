var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory');

/* GET list of items */
router.get('/list', inventoryController.inventoryList);

// Routers for edit
router.get('/edit/:id', inventoryController.displayEditPage);
router.post('/edit/:id', inventoryController.processEditPage);

// Delete
router.get('/delete/:id', inventoryController.performDelete);


/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', inventoryController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', inventoryController.processAddPage);

module.exports = router;