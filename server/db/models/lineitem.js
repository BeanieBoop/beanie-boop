const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('line item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = LineItem
