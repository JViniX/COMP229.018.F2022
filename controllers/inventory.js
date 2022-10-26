// create a reference to the model
let InventoryModel = require('../models/inventory');

module.exports.inventoryList = function(req, res, next) {  
    InventoryModel.find((err, inventoryList) => {
        //console.log(inventoryList);
        if(err)
        {
            return console.error(err);
        }
        else
        {     
            res.status(200).json(inventoryList);
        }
    });
}

module.exports.processEdit = (req, res, next) => {

    let id = req.params.id

    let updatedItem = InventoryModel({
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size_h,
            w: req.body.size_w,
            uom: req.body.size_uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
    });

    InventoryModel.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/inventory/list');
        }
    });

}


module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    InventoryModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/inventory/list');
        }
    });

}

module.exports.processAdd = (req, res, next) => {

    let newItem = InventoryModel({
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size.h,
            w: req.body.size.w,
            uom: req.body.size.uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
    });

    InventoryModel.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.status(200).json(item);
        }
    });
    
}