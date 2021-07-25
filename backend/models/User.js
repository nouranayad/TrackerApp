const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,

    },
    temperature: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    lat:{
        type: Number,
        required: true
    }
   
})

module.exports = User = mongoose.model('User', userSchema)