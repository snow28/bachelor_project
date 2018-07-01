let mongoose = require('mongoose');



let packageSchema = mongoose.Schema({
    group : {
        type : String,
        required : true
    },
    value : {
        type : Number,
        required : true
    },
    time : {
        type : String,
        required : true
    }
});


let Package = module.exports = mongoose.model('Package' , packageSchema);







