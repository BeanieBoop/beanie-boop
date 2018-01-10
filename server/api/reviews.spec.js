const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Review = db.model('review');

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/reviews/', () => {
    const rating = 3.5;
    const reviewText = "This is a test review. It's a pretty useless review";
    beforeEach(() => {
      Review.create({
        rating,
        reviewText
      });
    });

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].rating).to.be.equal(rating);
          expect(res.body[0].reviewText).to.be.equal(reviewText);
        });
    });
    it('GET /api/reviews/:id', () => {
      return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.rating).to.be.equal(rating);
          expect(res.body.reviewText).to.be.equal(reviewText);
        });
    });
    it('POST /api/reviews/', () => {
      const body = {
        rating: 3.0,
        reviewText: 'This is another review. Just as pointless as the last one.'
      };
      return request(app)
        .post('/api/reviews')
        .send(body)
        .then(function(res) {
          expect(res.body.rating).to.be.equal(3.0);
          expect(res.body.reviewText).to.be.equal(
            'This is another review. Just as pointless as the last one.'
          );
        });
    });

    it('PUT /api/reviews/', () => {
      return request(app)
        .put('/api/reviews/1')
        .send({
          reviewText:
            'This is an updated review. Hopefully not as pointless as the previous two....'
        })
        .then(function(res) {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body[0].reviewText).to.be.equal(
            'This is an updated review. Hopefully not as pointless as the previous two....'
          );
          return Review.findById(1);
        })
        .then(function(res) {
          expect(res.rating).to.be.equal(3.5);
          expect(res.reviewText).to.be.equal(
            'This is an updated review. Hopefully not as pointless as the previous two....'
          );
        });
    });
    it('DELETE /api/reviews/:id', () => {
      return request(app)
        .delete('/api/reviews/1')
        .then(function(res) {
          expect(res.statusCode).to.be.equal(204);
        });
    });
  });
});
