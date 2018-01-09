const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const title = 'Test Product'
		const description = 'Test Description'
		const price = 6.89
		const inventoryQuantity = 56
    beforeEach(() => {
      return Product.create({
        title,
				description,
				price,
				inventoryQuantity
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(title)
					expect(res.body[0].description).to.be.equal(description)
					expect(res.body[0].price).to.be.equal(price)
					expect(res.body[0].inventoryQuantity).to.be.equal(inventoryQuantity)
        })
    })
		it('GET /api/products/:id', () => {
			return request(app)
				.get('/api/products/1')
				.expect(200)
				.then(res => {
					expect(res.body).to.be.an('object')
					expect(res.body.title).to.be.equal(title)
					expect(res.body.description).to.be.equal(description)
					expect(res.body.price).to.be.equal(price)
					expect(res.body.inventoryQuantity).to.be.equal(inventoryQuantity)
				})
		})
  }) // end describe('/api/users')
})
