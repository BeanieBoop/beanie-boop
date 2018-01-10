const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  // JM - maybe have integer here, then have a method on product to get avg rating?
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
      // JM - maybe have validation error message?
    }
  }
})

module.exports = Review
