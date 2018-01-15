import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

export const ADD_LINE_ITEM_LS = 'ADD_LINE_ITEM_LS' // add new line item to localStorage
export const EDIT_LINE_ITEM_LS = 'EDIT_LINE_ITEM_LS' // edit line item in localStorage, i.e., quantity
export const REMOVE_LINE_ITEM_LS = 'REMOVE_LINE_ITEM_LS' // remove line item from localStorage

export const CREATE_LINE_ITEM_DB = 'CREATE_LINE_ITEM_DB' // POST to database upon submission of order


/**
 * ACTION CREATORS
 */

export const addLineItemLS = lineItem => ({type: ADD_LINE_ITEM_LS, lineItem})
export const editLineItemLS = (productId, newQuantity) => ({type: EDIT_LINE_ITEM_LS, productId, newQuantity})
export const removeLineItemLS = productId => ({type: REMOVE_LINE_ITEM_LS, productId})

export const createLineItemDB = lineItem => ({type: CREATE_LINE_ITEM_DB, lineItem})


/**
 * THUNK CREATORS
 */

export const removeLineItemThunk = productId => {
  console.log('productId', productId)
  return dispatch => {
    const lineItemsLS = JSON.parse(localStorage.getItem('lineItems')) // get lineItems from localStorage
    const lineItemToRemove = lineItemsLS.find(lineItem => lineItem.productId === productId)
    const indexToRemove = lineItemsLS.indexOf(lineItemToRemove)
    lineItemsLS.splice(indexToRemove, 1) // remove lineItem
    localStorage.setItem('lineItems', JSON.stringify(lineItemsLS)) // set localStorage to reflect lineItem removal
    const action = removeLineItemLS(productId)
    return dispatch(action) // set state to reflect changes
  }
}


export const postLineItem = (formData) =>
  dispatch =>
    axios.post('/api/lineItems', formData)
      .then(res => res.data)
      .then(lineItem => {
        const action = createLineItemDB(lineItem);
        dispatch(action);
      })
      .catch(err => console.log(err))



/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {

    case ADD_LINE_ITEM_LS:
      return [...state, action.lineItem]

    case EDIT_LINE_ITEM_LS: {
      let newState = [...state]
      const lineItemToEdit = newState.find(lineItem => lineItem.productId === action.productId)
      const indexToEdit = state.indexOf(lineItemToEdit)
      lineItemToEdit.quantity = action.newQuantity
      newState.splice(indexToEdit, 1, lineItemToEdit)
      return newState
    }

    case REMOVE_LINE_ITEM_LS: {
      let newState = [...state]
      const lineItemToRemove = newState.find(lineItem => lineItem.productId === action.productId)
      const indexToRemove = state.indexOf(lineItemToRemove)
      newState.splice(indexToRemove, 1)
      return newState
    }

    case CREATE_LINE_ITEM_DB:
      return [...state, action.lineItem]

    default:
      return state
  }
}
