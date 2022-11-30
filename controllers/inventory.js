// create a reference to the model
let InventoryModel = require('../models/inventory');
let fb = require('firebase-admin');

function getErrorMessage(err) {    
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

module.exports.inventoryList = async function(req, res, next){  

    try {
        // let inventoryList = await InventoryModel.find().populate({
        //     path: 'owner',
        //     select: 'firstName lastName email username admin created'
        // });

        let db = fb.firestore();
        let allDocs = await db.collection('inventory').get();

        let inventoryList = [];
        allDocs.forEach(
            item => {
                inventoryList.push(item.data());
            }
        );

        // setTimeout(()=>{
            res.status(200).json(inventoryList);        
        // },5000);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
    
}


module.exports.processEdit = (req, res, next) => {

    try {
        let id = req.params.id;

        console.log(req.body);

        let updatedItem = InventoryModel({
            _id: id,
            item: req.body.item,
            qty: req.body.qty,
            status: req.body.status,
            size : {
                h: req.body.size.h,
                w: req.body.size.w,
                uom: req.body.size.uom,
            },
            tags: (req.body.tags == null || req.body.tags == "") ? "": req.body.tags.split(",").map(word => word.trim()),
            // If it does not have an owner it assumes the ownership otherwise it transfers it.
            owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner 
        });

        console.log(updatedItem);
    
        InventoryModel.updateOne({_id: id}, updatedItem, (err, result) => {
            console.log(err, result);
            if(err || result.modifiedCount == 0)
            {
                console.log(err);
 
                return res.status(400).json(
                    { 
                        success: false, 
                        message: err ? getErrorMessage(err): 'Item not found.'
                    }
                );
            }
            else
            {
                res.status(200).json(
                    {
                        success: true,
                        message: 'Item updated successfully.'
                    }
                )
            }
        });
    } catch (error) {

        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}


module.exports.performDelete = (req, res, next) => {

    try {
        let id = req.params.id;

        InventoryModel.findByIdAndRemove({_id: id}, {rawResult:true}, (err, result) => {
            console.log(err, result);
            if(err || result.value == null)
            { 
                return res.status(400).json(
                    { 
                        success: false, 
                        message: err ? getErrorMessage(err): 'Item not found.'
                    }
                );
            }
            else
            {
                res.status(200).json(
                    {
                        success: true,
                        message: 'Item deleted successfully.'
                    }
                )
            }
        });
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }

    

}


module.exports.processAdd = async (req, res, next) => {

    try {

        let db = fb.firestore();

        // Generate locally a new doc.
        let newDoc = db.collection('inventory').doc();

        let newItem = {
            _id: newDoc.id,
            item: req.body.item,
            qty: req.body.qty,
            status: req.body.status,
            size : {
                h: req.body.size.h,
                w: req.body.size.w,
                uom: req.body.size.uom,
            },
            tags: (req.body.tags == null || req.body.tags == "") ? "": req.body.tags.split(",").map(word => word.trim())
            // If it does not have an owner it assumes the ownership otherwise it assigns it.
            // owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner
        };

        let response = await newDoc.set(newItem); 
        console.log(response);
        
        res.status(200).json(newItem);

    } catch (error) {
        console.log(error);
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }   
    
}