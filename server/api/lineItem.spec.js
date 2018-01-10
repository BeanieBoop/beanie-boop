const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Category = db.model('category')
const Order = db.model('order')
const LineItem = db.model('lineitem')

describe('LineItem routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('WITH ORDER IN PLACE: /api/lineItem/', () => {

    beforeEach(() => {
			return db.sync({force: true})
				.then(()=>{
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
		      return Order.create()
		    })

    })
		it('POST /api/lineItem/', () => {
			const body = {
				productId: 1,
				orderId: 1,
				unitPrice: 34.56,
				quantity: 5
			}
			return request(app)
	      .post('/api/lineItem')
	      .send(body)
	      .then(function(res) {
	        expect(res.body.productId).to.be.equal(1);
					expect(res.body.orderId).to.be.equal(1);
					expect(res.body.unitPrice).to.be.equal(34.56);
					expect(res.body.quantity).to.be.equal(5);
	      })
		})


  })
	describe('WITHOUT ORDER IN PLACE: /api/lineItem/', () => {

    beforeEach(() => {
			return db.sync({force: true})
				.then(()=>{
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
				

    })
		it('POST /api/lineItem/', () => {
			const body = {
				productId: 1,
				unitPrice: 34.56,
				quantity: 5
			}
			return request(app)
	      .post('/api/lineItem')
	      .send(body)
	      .then(function(res) {
	        expect(res.body.productId).to.be.equal(1);
					expect(res.body.orderId).to.be.equal(1);
					expect(res.body.unitPrice).to.be.equal(34.56);
					expect(res.body.quantity).to.be.equal(5);
	      })
		})


  })
})
