'use strict'

const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  active: { type: Boolean, default: true }
})
const Tag = mongoose.model('Tag', schema)

module.exports.getAllTags = () => {
  Tag.find({ active: true }).lean().exec()
    .then(tags => tags)
    .catch(err => err)
}

module.exports.getIdsByPaths = (paths) => {
    let _query = { path: { $in: paths } }

    Tag.find(_query).lean().exec()
      .then(tags => tags)
      .catch(err => err)
}
