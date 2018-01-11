const db = require('../db')
const Category = require('./category')
const Product = require('./product')
const User = require('./user')
const Review = require('./review')
const LineItem = require('./lineitem')
const Order = require('./order')


Product.belongsTo(Category)
Category.hasMany(Product)

LineItem.belongsTo(Order)
Order.hasMany(LineItem)

Order.belongsTo(User)
User.hasMany(Order)

LineItem.belongsTo(Product)
Product.hasMany(LineItem)

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

module.exports = {
  db,
  Category,
  Product,
  User,
  Review,
  LineItem,
  Order
}
