const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const schema = mongoose.Schema

const Course = new schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true},
    messenger: { type: String},
    tag: {type: String}
},{timestamps: true})

module.exports = mongoose.model('Course', Course);