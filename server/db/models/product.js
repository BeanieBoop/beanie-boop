const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./category')
const Review = require('./review')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/public/ty-logo.png'
  }
}, {
  defaultScope: {
    include: [Category]
  }
})

module.exports = Product
