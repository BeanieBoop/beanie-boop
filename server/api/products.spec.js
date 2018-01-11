const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Category = db.model('category')
const User = db.model('user')

const agent = request.agent(app);


describe('Product routes', () => {
  before(() => {
		const name = 'Test Product'
		const description = 'Test Description'
		const price = 6.89
		const inventoryQuantity = 56

    return db.sync({force: true})
    .then(()=>{
      return agent
        .post('/auth/signup')
        .send({ email: 'shaunoff@gmail.com', password: 'password' })
        .then(()=>{
          return User.update({isAdmin: true},{where: {id: 1}, returning: true})
        })
        .then(data => console.log("isAdmin"))
    })
		.then(()=>{
			return Category.create({
        name: "Scary Beanie Babies",
        description: "Sharp teeth etc."
      })
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

  describe('NON-ADMIN /api/products/', () => {
		const name = 'Test Product'
		const description = 'Test Description'
		const price = 6.89
		const inventoryQuantity = 56
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
	})
	describe('ADMIN-ONLY /api/products/', () => {

		it('ADMIN POST /api/products/', () => {

			const body = {
				name: "Bear Beanie",
				description: "This bear is the coolest looking beanie",
				price: 10.56,
				inventoryQuantity: 45,
				categoryId: 1
			}
			return agent
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
    it('NON-ADMIN POST /api/products/', () => {

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
	        expect(res.statusCode).to.be.equal(500);
	      })
		})

		it('ADMIN PUT /api/products/', () => {
			return agent
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
    it('NON-ADMIN PUT /api/products/', () => {
			return request(app)
	      .put('/api/products/1')
	      .send({description: "new description"})
				.then(function (res) {
						expect(res.statusCode).to.be.equal(500);

				})

		})
		it('ADMIN DELETE /api/products/:id', () => {
			return agent
	      .delete('/api/products/1')
				.then(function (res) {
						expect(res.statusCode).to.be.equal(202);
						expect(res.body).to.be.equal(1);
				})
		})
    it('NON-ADMIN DELETE /api/products/:id', () => {
			return request(app)
	      .delete('/api/products/1')
				.then(function (res) {
						expect(res.statusCode).to.be.equal(500);
						
				})
		})
  }) // end describe('/api/users')
})
