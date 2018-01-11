const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Category = db.model('category');
const User = db.model('user');


const agent = request.agent(app);

describe('Category routes', () => {
  before(() => {
    return db.sync({ force: true })
    .then(()=>{
      return agent
        .post('/auth/signup')
        .send({ email: 'shaunoff@gmail.com', password: 'password' })
        .then(()=>{
          return User.update({isAdmin: true},{where: {id: 1}, returning: true})
        })
        .then(data => console.log("isAdmin"))
    })
  });

  describe('NON-ADMIN /api/categories/', () => {
    const name = 'Test Category';

    beforeEach(() => {
      return Category.create({
        name,
      });
    });

    it('GET /api/categories', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(name);
        });
    });

    it('GET /api/categories/:id', () => {
      return request(app)
        .get('/api/categories/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal(name);
        });
    });
})

describe('ADMIN-ONLY /api/categories/', () => {
      const body = {
        name: 'Scary Beanie Babies',
        description: 'Sharp teeth!',
      };
    it('ADMIN POST /api/categories', () => {

      return agent
        .post('/api/categories')
        .send(body)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal(body.name);
          expect(res.body.description).to.be.equal(body.description);
        });
    });
    it('NON-ADMIN POST /api/categories', () => {

      return request(app)
        .post('/api/categories')
        .send(body)
        .then(res => {
          expect(res.statusCode).to.be.equal(500);
        });
    });



    it('ADMIN PUT /api/categories/:id', () => {
      return agent
        .put('/api/categories/1')
        .send({ name: 'new category name' })
        .then(function(res) {
          expect(res.statusCode).to.be.equal(202);
          expect(res.body.name).to.be.equal('new category name');
          return Category.findById(1);
        })
        .then(function(res) {
          expect(res.name).to.be.equal('new category name');
        });
    });

    it('NON-ADMIN PUT /api/categories/:id', () => {
      return request(app)
        .put('/api/categories/1')
        .send({ name: 'new category name' })
        .then(function(res) {
          expect(res.statusCode).to.be.equal(500);
        })
    });

    it('ADMIN DELETE /api/categories/:id', () => {
      return agent
        .delete('/api/categories/1')
        .then(res => {
          expect(res.statusCode).to.be.equal(202);
          expect(res.body).to.be.equal(1);
        });
    });
    it('NON-ADMIN DELETE /api/categories/:id', () => {
      return request(app)
        .delete('/api/categories/1')
        .then(res => {
          expect(res.statusCode).to.be.equal(500);
        });
    });
  });
});
