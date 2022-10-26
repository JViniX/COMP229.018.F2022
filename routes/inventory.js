var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

/* GET list of items */
router.get('/list', inventoryController.inventoryList);

// Routers for edit
router.put('/edit/:id', inventoryController.processEdit);

// Delete
router.delete('/delete/:id', inventoryController.performDelete);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', inventoryController.processAdd);

module.exports = router;