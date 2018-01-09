/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {

  beforeEach(() => {
    return db.sync({force: true})
    .then(() => {
      return Review.create({
        rating: 4.5,
        reviewText: 'Really cool stuff.'
      })
    })
  })

    it('contains rating and reviewText', () => {
      Review.findById(1)
      .then(review => {
        expect(review.rating).to.exist
        expect(review.reviewText).to.exist
      })
      .catch(console.err)
    })

    describe('Validations', function () {
      let review;

      beforeEach(() => {
        review = Review.build()
      })

      it('errors without rating', function () {
        return review.validate()
            .catch(err => {
                expect(err).to.exist
                expect(err.errors[0]).to.have.property('path', 'rating')
            })
      })

    })

})
