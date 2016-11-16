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
  return new Promise((resolve, reject) => {
    Tag.find({ active: true }).lean().exec((err, tags) => {
      if (err) {
        reject(err)
      } else {
        resolve(tags)
      }
    })
  })
}

module.exports.getIdsByPaths = (paths) => {
  return new Promise((resolve, reject) => {
    let _query = { path: { $in: paths } }

    Tag.find(_query).lean().exec((err, tags) => {
      if (err) {
        reject(err)
      } else {
        resolve(tags)
      }
    })
  })
}
