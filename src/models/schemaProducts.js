const mongoose = require('mongoose');

const schemaProducts = new mongoose.Schema({
  code: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  units: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Product', schemaProducts)