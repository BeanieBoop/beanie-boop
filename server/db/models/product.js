const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  // JM - integer, 1.99 === 199, then on FE (or in getter/setter divide or multiply by 100)
  price: {
    type: Sequelize.FLOAT
  },
  inventoryQuantity: {
    // JM - validation for -ve 
    type: Sequelize.INTEGER
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/public/ty-logo.png'
  }
})

module.exports = Product
