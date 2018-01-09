const Sequelize = require('sequelize')
const db = require('../db')

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
      len: [4, 250]
    }
  }
})

module.exports = Review
