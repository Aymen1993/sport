const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    pwd: String,
    tel: String,

});
const client = mongoose.model("Client", clientSchema);
module.exports = client;