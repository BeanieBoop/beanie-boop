import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const GET_CATEGORIES = 'GET_CATEGORIES' // GET
export const CREATE_CATEGORY = 'CREATE_CATEGORY' // POST
export const EDIT_CATEGORY = 'EDIT_CATEGORY' // PUT
export const DELETE_CATEGORY = 'DELETE_CATEGORY' // DELETE

/**
 * ACTION CREATORS
 */
export const getCategories = categories => ({type: GET_CATEGORIES, categories})
export const createCategory = category => ({type: CREATE_CATEGORY, category})
export const editCategory = category => ({type: EDIT_CATEGORY, category})
export const deleteCategory = categoryId => ({type: DELETE_CATEGORY, categoryId})

/**
 * THUNK CREATORS
 */
export const fetchCategories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = getCategories(categories);
        dispatch(action);
      })
      .catch(err => console.log(err))

export const postCategory = (formData) =>
  dispatch =>
    axios.post('/api/categories', formData)
      .then(res => res.data)
      .then(category => {
        const action = createCategory(category);
        dispatch(action);
        history.push(`/categories/${category.id}`)  // redirects to newly-CREATED category page
      })
      .catch(err => console.log(err))

export const putCategory = (categoryId, formData) =>
  dispatch =>
    axios.put(`/api/categories/${categoryId}`, formData)
      .then(res => res.data)
      .then(category => {
        const action = editCategory(category);
        dispatch(action);
        history.push(`/categories/${category.id}`)  // redirects to newly-EDITED category page
      })
      .catch(err => console.log(err))

export const destroyCategory = (categoryId) =>
  dispatch =>
    axios.delete(`/api/categories/${categoryId}`)
      .then(() => {
        const action = deleteCategory(categoryId);
        dispatch(action);
        history.push(`/categories`)  // redirects to all categories after delete
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {

    case GET_CATEGORIES:
      return action.categories

    case CREATE_CATEGORY:
      return [...state, action.category]

    case EDIT_CATEGORY: {
      const itemToEdit = state.find(category => category.id === action.category.id);
      const indexOfItemToEdit = state.indexOf(itemToEdit);
      let newState = [...state];
      newState.splice(indexOfItemToEdit, 1, action.category);
      return newState;
    }

    case DELETE_CATEGORY: {
      const itemToDelete = state.find(category => category.id === action.category.id);
      const indexOfItemToDelete = state.indexOf(itemToDelete);
      let newState = [...state];
      newState.splice(indexOfItemToDelete, 1);
      return newState;
    }

    default:
      return state
  }
}
