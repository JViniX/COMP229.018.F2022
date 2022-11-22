// In real project, never expose your credential in your code.
let uriDB = require('./config').ATLASDB;

let mongoose = require('mongoose');

module.exports = function(){

    // Connect to the database
    mongoose.connect(uriDB);

    let mongodb = mongoose.connection;
    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('==== Connected to MongoDB ====');
    });

    return mongodb;
}