/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {

  beforeEach(() => {
    return db.sync({force: true})
    .then(() => {
      return Product.create({
        name: 'Bloo',
        description: 'This beanie baby is a blue bunny',
        price: 15.99,
        inventoryQuantity: 74
      })
    })
  })

    it('contains name, description, price, and inventoryQuantity', () => {
      Product.findById(1)
      .then(Product => {
        expect(Product.name).to.exist
        expect(Product.description).to.exist
        expect(Product.price).to.exist
        expect(Product.inventoryQuantity).to.exist
      })
      .catch(console.err)
    })

    describe('Validations', function () {
      let product;

      beforeEach(() => {
        product = Product.build()
      })

      it('errors without name', function () {
        return product.validate()
            .catch(err => {
                expect(err).to.exist
                console.log('ERRROR!', err.errors)
                expect(err.errors[0]).to.have.property('path', 'name')
            })
      })

    })

})
