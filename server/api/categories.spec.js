/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Category = db.model('category');

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/categories/', () => {
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

    it('POST /api/categories', () => {
      const body = {
        name: 'Scary Beanie Babies',
        description: 'Sharp teeth!',
      };
      return request(app)
        .post('/api/categories')
        .send(body)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal(body.name);
          expect(res.body.description).to.be.equal(body.description);
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

    it('PUT /api/categories/:id', () => {
      return request(app)
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

    it('DELETE /api/categories/:id', () => {
      return request(app)
        .delete('/api/categories/1')
        .then(res => {
          expect(res.statusCode).to.be.equal(202);
          expect(res.body).to.be.equal(1);
        });
    });
  }); // end describe('/api/categories')
}); // end describe('Category routes')
