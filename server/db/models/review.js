const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Product = require('./product')

const Review = db.define('review', {
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0,
      max: 5.0
    }
  },
  reviewText: {
    type: Sequelize.TEXT,
    validate: {
      len: [10, 250]
    }
  }
})

module.exports = Review
