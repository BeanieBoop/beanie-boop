import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS' // GET
export const CREATE_PRODUCT = 'CREATE_PRODUCT' // POST
export const EDIT_PRODUCT = 'EDIT_PRODUCT' // PUT
export const DELETE_PRODUCT = 'DELETE_PRODUCT' // DELETE
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const CHANGE_SEARCH = 'CHANGE_SEARCH'
export const CHANGE_ORDER = 'CHANGE_ORDER'

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({type: GET_PRODUCTS, products})
export const createProduct = product => ({type: CREATE_PRODUCT, product})
export const editProduct = product => ({type: EDIT_PRODUCT, product})
export const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})
export const changeCategory = category => ({type: CHANGE_CATEGORY, category})
export const changeSearch = search =>  ({type: CHANGE_SEARCH, search})
export const changeOrder = order =>  ({type: CHANGE_ORDER, order})



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
        //history.push(`/products/${product.id}`)  // redirects to newly-EDITED product page
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
export default function (state = {products: [], category: 'All', search: "", order: 'nameAsc'}, action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return {...state, products: action.products}

    case CREATE_PRODUCT:
      return {...state, products: [...state.products,action.products]}

    case EDIT_PRODUCT: {
      console.log(action.product)
      const updatedProduct = action.product[0]
      const {name, description, price, inventoryQuantity} = updatedProduct
      const newProducts = state.products.map(stateProduct =>{
        if(stateProduct.id === updatedProduct.id) return {...stateProduct, name, description, price, inventoryQuantity}
        return stateProduct
      })
      return {...state, products: newProducts};
    }

    case DELETE_PRODUCT: {

      const itemToDelete = state.products.find(product => product.id === action.product.id);
      const indexOfItemToDelete = state.products.indexOf(itemToDelete);
      let newState = [...state];
      newState.splice(indexOfItemToDelete, 1);
      return {...state, products: newState};
    }
    case CHANGE_CATEGORY: {
      const {category} = action
      return {...state, category}
    }
    case CHANGE_SEARCH: {
      return {...state, search: action.search}
    }
    case CHANGE_ORDER: {
      return {...state, order: action.order ? action.order : 'nameAsc'}
    }
    default:
      return state
  }
}
