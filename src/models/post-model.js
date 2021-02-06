'use strict'

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const imageSchema = require('./image-model')
const schema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: null },
  createdIn: { type: Date, required: true },
  author: { type: ObjectId, ref: 'Author', required: true },
  tags: { type: [{ type: ObjectId, ref: 'Tag' }], default: [] },
  mainTag: { type: ObjectId, ref: 'Tag', required: true },
  active: { type: Boolean, default: true },
  image: { type: imageSchema, required: true },
  content: { type: String, required: true }
})
const Post = mongoose.model('Post', schema)
const Tag = require('./tag-model')

module.exports.getPostsByName = (search) => {
  let _query = { active: true }

  if (search) {
    _query.$or = [
      { title: new RegExp(search, 'i') },
      { subtitle: new RegExp(search, 'i') }
    ]
  }

  Post.find(_query).populate('author').populate('tags').populate('mainTag').lean().exec()
    .then(posts => posts)
    .catch(err => err)
}

module.exports.getPostsByTags = (tagPaths) => {
  Tag.getIdsByPaths(tagPaths)
    .then((tagIds) => {
      let _query = { active: true }

      if (tagIds) {
        _query.tags = { $in: tagIds }
      }

      Post.find(_query)
        .populate('author')
        .populate('tags')
        .populate('mainTag')
        .lean()
        .exec()
        .then(posts)
        .catch(err)
    })
    .then(posts => posts)
    .catch(err => err)
}

module.exports.getPostByPath = (path) => {
  let _query = { active: true, path: path }

  Post.findOne(_query)
    .populate('author')
    .populate('tags')
    .populate('mainTag')
    .lean()
    .exec()
    .then(posts => posts)
    .catch(err => err)
}

module.exports.getPostsByAuthor = (authorId) => {
  let _query = { active: true, author: authorId }

  Post.find(_query).populate('tags').populate('mainTag').lean().exec()
    .then(posts => posts)
    .catch(err => err)
}
