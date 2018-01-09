const Category = require('./category');
const Product = require('./product');
const User = require('./user');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Product.belongsTo(Category, {
  // foreignKey: {
  //   allowNull: false,
  // },
  as: 'category',
  onDelete: 'cascade',
});
Category.hasMany(Product, { onDelete: 'cascade' });

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
};
