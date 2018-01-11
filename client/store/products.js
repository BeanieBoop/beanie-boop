import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS' // GET
export const CREATE_PRODUCT = 'CREATE_PRODUCT' // POST
export const EDIT_PRODUCT = 'EDIT_PRODUCT' // PUT
export const DELETE_PRODUCT = 'DELETE_PRODUCT' // DELETE

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({type: GET_PRODUCTS, products})
export const createProduct = product => ({type: CREATE_PRODUCT, product})
export const editProduct = product => ({type: EDIT_PRODUCT, product})
export const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        const action = getProducts(products);
        dispatch(action);
      })
      .catch(err => console.log(err))

export const postProduct = (formData) =>
  dispatch =>
    axios.post('/api/products', formData)
      .then(res => res.data)
      .then(product => {
        const action = createProduct(product);
        dispatch(action);
        history.push(`/products/${product.id}`)  // redirects to newly-CREATED product page
      })
      .catch(err => console.log(err))

export const putProduct = (productId, formData) =>
  dispatch =>
    axios.put(`/api/products/${productId}`, formData)
      .then(res => res.data)
      .then(product => {
        const action = editProduct(product);
        dispatch(action);
        history.push(`/products/${product.id}`)  // redirects to newly-EDITED product page
      })
      .catch(err => console.log(err))

export const destroyProduct = (productId) =>
  dispatch =>
    axios.delete(`/api/products/${productId}`)
      .then(() => {
        const action = deleteProduct(productId);
        dispatch(action);
        history.push(`/products`)  // redirects to all products after delete
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return action.products

    case CREATE_PRODUCT:
      return [...state, action.product]

    case EDIT_PRODUCT: {
      const itemToEdit = state.find(product => product.id === action.product.id);
      const indexOfItemToEdit = state.indexOf(itemToEdit);
      let newState = [...state];
      newState.splice(indexOfItemToEdit, 1, action.product);
      return newState;
    }

    case DELETE_PRODUCT: {
      const itemToDelete = state.find(product => product.id === action.product.id);
      const indexOfItemToDelete = state.indexOf(itemToDelete);
      let newState = [...state];
      newState.splice(indexOfItemToDelete, 1);
      return newState;
    }

    default:
      return state
  }
}
