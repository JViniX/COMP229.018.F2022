let fbAdmin = require('firebase-admin');
require('dotenv').config();

module.exports = function(){

    fbAdmin.initializeApp(
        {
            credential: fbAdmin.credential.cert(JSON.parse(process.env.GCLOUD_SERVICE_ACCOUNT))
        }
    );

    console.log('===> Connected to Firebase');
}