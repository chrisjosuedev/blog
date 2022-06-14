const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
  title: {
    type: String,
    maxlength: 10
  },
  description: {
    type: String,
    maxlength: 140
  }
})

module.exports = model('Blogs', blogSchema)