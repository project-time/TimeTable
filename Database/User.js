const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", UserSchema);