let fbAdmin = require('firebase-admin');
require('dotenv').config();

module.exports = function(){

    if(process.env.NODE_ENV == 'production'){
        fbAdmin.initializeApp();
    }
    else{
        fbAdmin.initializeApp(
            {
                credential: fbAdmin.credential.cert(JSON.parse(process.env.GCLOUD_SERVICE_ACCOUNT))
            }
        );
    }

    console.log('===> Connected to Firebase');
}