// require mongoose
const mongoose = require('mongoose');
// connecting
mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');

// acquire the connection
const db = mongoose.connection;
// check for error

db.on('error', console.error.bind(console, 'connection error:'));

// connecting is open 
db.once('open', function(){
    console.log('connected to database');
});