const db = require('../db')
const Category = require('./category')
const Product = require('./product')
const User = require('./user')
const Review = require('./review')
const LineItem = require('./lineitem')
const Order = require('./order')

// const Session = db.model('Session')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 // JM - maybe don't need onDelete
Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
})

Category.hasMany(Product, { onDelete: 'CASCADE' })

LineItem.belongsTo(Order, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
})
Order.hasMany(LineItem)

Order.belongsTo(User)
// JM - do reciprocal association
// User.hasMany(Order)

// Order.belongsTo(Session)

LineItem.belongsTo(Product);

Review.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  Category,
  Product,
  User,
  Review,
  LineItem,
  Order
}
