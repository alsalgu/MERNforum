const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cat = new Schema({name: String, sex: String, color: String})

module.exports = mongoose.model('Cat', cat)
