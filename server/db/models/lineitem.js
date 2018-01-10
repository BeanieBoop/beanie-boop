const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')

const LineItem = db.define('lineitem', {
  unitPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  defaultScope: {
    include: [Order]
  }
})

module.exports = LineItem
