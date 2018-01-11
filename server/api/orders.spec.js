const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

const agent = request.agent(app);

describe('Order routes', () => {
  before(() => {
    return db.sync({ force: true })
    .then(()=>{
      return agent
        .post('/auth/signup')
        .send({ email: 'shaunoff@gmail.com', password: 'password' })
        .then(()=>{
          return console.log('user created')
        })
    });
  });

  describe('/api/orders/', () => {
    before(() => {
      return Order.create();
    });

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
        });
    });

    it('GET /api/orders/:id', () => {
      return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.equal(1);
        });
    });

    it('POST /api/orders/', () => {
      return request(app)
        .post('/api/orders')
        .send({})
        .then(function(res) {
          expect(res.statusCode).to.be.equal(202);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.equal(2);
        });
    });

    it('PUT /api/orders/:id', () => {
      return request(app)
        .put('/api/orders/1')
        .send({ newOrder: 'new order details' })
        .then(function(res) {
          expect(res.statusCode).to.be.equal(202);
          return Order.findById(1);
        });
    });
    describe('AUTHORISED /api/orders/', () => {
      it('LOGGED-IN DELETE /api/orders/:id', () => {
        return agent
          .delete('/api/orders/1')
          .then(res => {
            expect(res.statusCode).to.be.equal(202);
            expect(res.body).to.be.equal(1);
          });
      });
      it('LOGGED-OUT DELETE /api/orders/:id', () => {
        return request(app)
          .delete('/api/orders/1')
          .then(res => {
            expect(res.statusCode).to.be.equal(500);
          });
      });
    })

    // });
  }); // end describe('/api/orders')
});
