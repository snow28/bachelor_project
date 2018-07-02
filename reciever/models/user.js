let mongoose = require('mongoose');



let UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});


let User = module.exports = mongoose.model('User' , UserSchema);