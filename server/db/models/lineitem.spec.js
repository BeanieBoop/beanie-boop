/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const LineItem = db.model('lineitem')
const Order = db.model('order')

describe('LineItem model', () => {

  beforeEach(() => {
    return db.sync({force: true})
    .then(() => {
      return Order.create()
    })
    .then((order) => {
      // order.createLineItem({
      //   unitPrice: 30.00,
      //   quantity: 1
      // })
      return LineItem.create({
        unitPrice: 30.99,
        quantity: 2
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
