const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order')

// JM - ENUM for order status
// status ==> open, inProcess, complete, 
// How about non-logged in user?
// localStorage? Cookies?

module.exports = Order



