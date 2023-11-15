const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true},
    pwd: String,
    gender: String,
    role: String,
    avatar:String
});
userSchema.plugin(uniqueValidator);
const user = mongoose.model("User", userSchema);
module.exports = user;