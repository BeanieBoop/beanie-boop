/* global describe beforeEach afterEach it */

// import action types
import { GET_REVIEWS, CREATE_REVIEW, EDIT_REVIEW, DELETE_REVIEW } from './reviews';

// import action creators
import { getReviews, createReview, editReview, deleteReview } from './reviews';

// import thunk creators
import { fetchReviews, postReview, putReview, destroyReview } from './reviews';

import { expect } from 'chai';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  before(() => {
    mockAxios = new MockAdapter(axios);
  })

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchReviews', () => {
    it('dispatches the GET_REVIEWS action', () => {
      const reviews = [
        {
          rating: 5,
          reviewText: 'This is a great Beanie-boop site!',
        },
        {
          rating: 3,
          reviewText: 'This is a ok Beanie-boop site!',
        },
      ];
      mockAxios.onGet('/api/reviews').replyOnce(200, reviews);

      return store.dispatch(fetchReviews()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal(GET_REVIEWS);
        expect(actions[0].reviews).to.be.deep.equal(reviews);
      });
    });
  });

  describe('postReview', () => {
    it('dispatches the CREATE_REVIEW action', () => {
      const fakeReview = {
        rating: 3.5,
        reviewText: "This is a test review. It's a pretty useless review",
      };

      mockAxios.onPost('/api/reviews', fakeReview).replyOnce(201, fakeReview);

      return store.dispatch(postReview(fakeReview)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal(CREATE_REVIEW);
        expect(actions[0].review).to.be.deep.equal(fakeReview);
      });
    });
  });

  describe('putReview', () => {
    it('dispatches the EDIT_REVIEW action', () => {
      const fakeReviewId = 2;

      const fakeUpdate = {
        rating: 4,
        reviewText: 'This a pretty essential review...',
      };

      const fakeUpdatedReview = {
        id: 2,
        rating: 4,
        reviewText: 'This a pretty essential review...',
      };

      mockAxios.onPut(`/api/reviews/2`, fakeUpdate).replyOnce(204, fakeUpdatedReview);

      return store.dispatch(putReview(fakeReviewId, fakeUpdate)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal(EDIT_REVIEW);
        expect(actions[0].review).to.be.deep.equal(fakeUpdatedReview);
      });
    });
  });

  describe('destroyReview', () => {
    it('dispatches the DELETE_REVIEW action', () => {
      mockAxios.onDelete('/api/reviews/1').replyOnce(204);

      return store.dispatch(destroyReview(1)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal(DELETE_REVIEW);
        expect(actions[0].reviewId).to.be.deep.equal(1);
      });
    });
  });
});
