const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required:true, 
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type: String,
        trim:true
    },
    idDoc:{
        type: Number,
    },
    correo:{
        type: String,
        required:true,
        unique: true,
        index: true,
        trim:true

    },
    birthdate:{
        type:Date,
    },
    active:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', User);