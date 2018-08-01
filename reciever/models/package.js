let mongoose = require('mongoose');



let packageSchema = mongoose.Schema({
    group : {
        type : String,
        required : true
    },
    value : {
        type : Number
    },
    text_value : {
        type : String
    },
    time : {
        type : String,
        required : true
    }
});


let Package = module.exports = mongoose.model('Package' , packageSchema);







