const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Category = db.model('category')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const name = 'Test Product'
		const description = 'Test Description'
		const price = 6.89
		const inventoryQuantity = 56
    beforeEach(() => {
			return Category.create({
        name: "Scary Beanie Babies",
        description: "Sharp teeth etc."
      })
			.then(()=>{
				return Product.create({
	        name,
					description,
					price,
					inventoryQuantity,
					categoryId: 1
	      })
			})

    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(name)
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
					expect(res.body.name).to.be.equal(name)
					expect(res.body.description).to.be.equal(description)
					expect(res.body.price).to.be.equal(price)
					expect(res.body.inventoryQuantity).to.be.equal(inventoryQuantity)
				})
		})
		it('POST /api/products/', () => {
			const body = {
				name: "Bear Beanie",
				description: "This bear is the coolest looking beanie",
				price: 10.56,
				inventoryQuantity: 45,
				categoryId: 1
			}
			return request(app)
	      .post('/api/products')
	      .send(body)
	      .then(function(res) {
	        expect(res.body.name).to.be.equal('Bear Beanie');
					expect(res.body.description).to.be.equal("This bear is the coolest looking beanie");
					expect(res.body.price).to.be.equal(10.56);
					expect(res.body.inventoryQuantity).to.be.equal(45);
	        expect(res.statusCode).to.be.equal(201);
	      })
		})

		it('PUT /api/products/', () => {
			return request(app)
	      .put('/api/products/1')
	      .send({description: "new description"})
				.then(function (res) {
						expect(res.statusCode).to.be.equal(200);
						expect(res.body[0].description).to.be.equal('new description');
						return Product.findById(1);
				})
	      .then(function(res) {
	        expect(res.name).to.be.equal('Test Product');
					expect(res.description).to.be.equal('new description');
	      })
		})
		it('DELETE /api/products/:id', () => {
			return request(app)
	      .delete('/api/products/1')
				.then(function (res) {
						expect(res.statusCode).to.be.equal(202);
						expect(res.body).to.be.equal(1);
				})
		})
  }) // end describe('/api/users')
})
