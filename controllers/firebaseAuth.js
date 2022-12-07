const firebase = require('firebase-admin');

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

module.exports.signup = function(req, res, next){
  
    firebase.auth().createUser({
        displayName: req.body.displayName,
        email: req.body.email,
        password: req.body.password,
        photoURL: req.body.photoURL,
        phoneNumber: req.body.phoneNumber
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord);
      return res.json(
        {
          success: true, 
          message: 'User created successfully!'
        }
      );
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      return res.status(400).json(
        {
          success: false, 
          message: error.message
        }
      );
    });
  
  }

  
exports.requireAuth = function(req, res, next){
  
    let token = req.header('Authorization').substr(7);
    
    firebase.auth().verifyIdToken(token,true)
    .then((decodedToken) => {
      console.log(decodedToken);    
      req.payload = decodedToken;
      next();
    })
    .catch((error) => {
      // Handle error
      console.log(error);
      res.status(401).json({ 
        success: false, 
        message: getErrorMessage(error)
      });
    });
    
  }

  
// Validates the owner of the item.
exports.isAllowed = async function (req, res, next){

    try {
        let id = req.params.id
  
        let db = firebase.firestore();
      
        await db.collection('inventory').doc(id).get()
        .then(item => {            
          let inventoryItem = item.data();
  
          // If there is no item found.
          if(inventoryItem == null){
            throw new Error('Item not found.') // Express will catch this on its own.
          }
          else if(inventoryItem.owner != null){ // If the item found has a owner.
  
            if(inventoryItem.owner != req.payload.uid){ // If the owner differs.
  
              console.log('====> Not authorized');
              return res.status(403).json(
                  { 
                      success: false, 
                      message: 'User is not authorized to modify this item.'
                  }
              );
            }        
          }
  
          // If it reaches this point, runs the next middleware.
          next();
        });         
        
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
  