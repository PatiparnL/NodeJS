const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    PACKAGE_INPUT: String,
    PACKAGE_INPUT_TYPE: String,
    PACKAGE_TYPE: String,
    OPERATOR:String,
    ADDITIONAL_OPERATOR: String,
    VALUE: String
});

module.exports = mongoose.model('package_rules', UserSchema);