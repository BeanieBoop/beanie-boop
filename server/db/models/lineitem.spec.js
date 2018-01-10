/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const LineItem = db.model('lineitem')
const Order = db.model('order')
const Product = db.model('product')
const Category = db.model('category')

describe('LineItem model', () => {

  beforeEach(() => {
    return db.sync({force: true})
    .then(() => {
      return Order.create()
    })
    .then(() => {
      return Category.create({
        name: 'Limited Edition',
        description: 'This category is used to find all limited edition beanie babies.'
      })
    })
    .then(() => {
      return Product.create({
        name: 'Bloo',
        description: 'This beanie baby is a blue bunny',
        price: 15.99,
        inventoryQuantity: 74,
        categoryId: 1
      })
    })
    .then(() => {
      return LineItem.create({
        unitPrice: 30.99,
        quantity: 2,
        orderId: 1,
        productId: 1
      })
    })
  })

    it('contains rating and reviewText', () => {
      LineItem.findById(1)
      .then(lineItem => {
        expect(lineItem.unitPrice).to.exist
        expect(lineItem.quantity).to.exist
      })
      .catch(console.err)
    })

    describe('Validations', function () {
      let lineItem;

      beforeEach(() => {
        lineItem = LineItem.build()
      })

      it('errors without unitPrice', function () {
        return lineItem.validate()
            .catch(err => {
                // console.log("ERROR", err);
                expect(err).to.exist
                expect(err.errors[0]).to.have.property('path', 'unitPrice')
            })
      })

      it('errors without quantity', function () {
        return lineItem.validate()
            .catch(err => {
                expect(err).to.exist
                expect(err.errors[1]).to.have.property('path', 'quantity')
            })
      })

    })

})
