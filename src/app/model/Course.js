const mongoose = require('mongoose');
const { TIMESTAMP } = require('mysql/lib/protocol/constants/types');
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const schema = mongoose.Schema
const ObjectId = schema.ObjectId;

const Course = new schema({
    name: { type: String },
    description: { type: String },
    image: { type: String, maxlength: 255 },
    slug: { type: String, slug: 'name', unique: true},
    videoID: { type: String},
},{timestamps: true})

module.exports = mongoose.model('Course', Course);