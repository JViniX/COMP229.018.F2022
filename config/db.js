// In real project, never expose your credential in your code.
let atlasDB = "mongodb+srv://dbuser:4KzjQuEd2bQTExAo@cluster018.ayy52ye.mongodb.net/dbapp?retryWrites=true&w=majority";
let localDB = "mongodb://localhost:27017/dbapp";

let mongoose = require('mongoose');

module.exports = function(){

    // Connect to the database
    mongoose.connect(atlasDB);

    let mongodb = mongoose.connection;
    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('==== Connected to MongoDB ====');
    });

    return mongodb;
}