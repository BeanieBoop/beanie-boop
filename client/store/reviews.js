import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
export const GET_REVIEWS = 'GET_REVIEWS'; // GET
export const CREATE_REVIEW = 'CREATE_REVIEW'; // POST
export const EDIT_REVIEW = 'EDIT_REVIEW'; // PUT
export const DELETE_REVIEW = 'DELETE_REVIEW'; // DELETE

/**
 * ACTION CREATORS
 */
export const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
export const createReview = review => ({ type: CREATE_REVIEW, review });
export const editReview = review => ({ type: EDIT_REVIEW, review });
export const deleteReview = reviewId => ({ type: DELETE_REVIEW, reviewId });

/**
 * THUNK CREATORS
 */
export const fetchReviews = () => dispatch =>
  axios
    .get('/api/reviews')
    .then(res => res.data)
    .then(reviews => {
      const action = getReviews(reviews);
      dispatch(action);
    })
    .catch(err => console.log(err));

export const postReview = formData => dispatch =>
  axios
    .post('/api/reviews', formData)
    .then(res => res.data)
    .then(review => {
      const action = createReview(review);
      dispatch(action);
      history.push(`/reviews/${review.id}`); // redirects to newly-CREATED review
    })
    .catch(err => console.log(err));

export const putReview = (reviewId, formData) => dispatch =>
  axios
    .put(`/api/reviews/${reviewId}`, formData)
    .then(res => res.data)
    .then(review => {
      const action = editReview(review);
      dispatch(action);
      history.push(`/reviews/${review.id}`); // redirects to newly-EDITED review
    })
    .catch(err => console.log(err));

export const destroyReview = reviewId => dispatch =>
  axios
    .delete(`/api/reviews/${reviewId}`)
    .then(() => {
      const action = deleteReview(reviewId);
      dispatch(action);
      history.push(`/reviews`); // redirects to all reviews after delete
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;

    case CREATE_REVIEW:
      return [...state, action.review];

    case EDIT_REVIEW: {
      const itemToEdit = state.find(review => review.id === action.review.id);
      const indexOfItemToEdit = state.indexOf(itemToEdit);
      let newState = [...state];
      newState.splice(indexOfItemToEdit, 1, action.review);
      return newState;
    }

    case DELETE_REVIEW: {
      const itemToDelete = state.find(review => review.id === action.review.id);
      const indexOfItemToDelete = state.indexOf(itemToDelete);
      let newState = [...state];
      newState.splice(indexOfItemToDelete, 1);
      return newState;
    }

    default:
      return state;
  }
}
