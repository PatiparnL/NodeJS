const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Msg_Id: Number,
    Sender: String,
    Msg: String,
});

module.exports = mongoose.model('hellos', UserSchema);