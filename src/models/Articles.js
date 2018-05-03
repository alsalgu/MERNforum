const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const article = new Schema({title: String, body: String, author: String})

module.exports = mongoose.model('Article', article)
