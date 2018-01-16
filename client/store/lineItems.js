import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

export const ADD_LINE_ITEM = 'ADD_LINE_ITEM' // add new line item to localStorage
export const EDIT_LINE_ITEM = 'EDIT_LINE_ITEM' // edit line item in localStorage, i.e., quantity
export const REMOVE_LINE_ITEM = 'REMOVE_LINE_ITEM' // remove line item from localStorage
export const CLEAR_LINE_ITEMS = 'CLEAR_LINE_ITEMS' // clear all line items from store once order is submitted


/**
 * ACTION CREATORS
 */

export const addLineItem = lineItem => ({type: ADD_LINE_ITEM, lineItem})
export const editLineItem = (productId, newQuantity) => ({type: EDIT_LINE_ITEM, productId, newQuantity})
export const removeLineItem = productId => ({type: REMOVE_LINE_ITEM, productId})
export const clearLineItems = () => ({type: CLEAR_LINE_ITEMS})


/**
 * THUNK CREATORS
 */

export const syncLocalStorage = state => {
  const lineItems = JSON.stringify(state.lineItems)
  localStorage.setItem('lineItems', lineItems)
}

/**
 * REDUCER
 */

const initialState = JSON.parse(localStorage.getItem('lineItems')) || []

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_LINE_ITEM:
      return [...state, action.lineItem]

    case EDIT_LINE_ITEM: {
      let newState = [...state]
      const lineItemToEdit = newState.find(lineItem => lineItem.productId === action.productId)
      const indexToEdit = state.indexOf(lineItemToEdit)
      lineItemToEdit.quantity = action.newQuantity
      newState.splice(indexToEdit, 1, lineItemToEdit)
      return newState
    }

    case REMOVE_LINE_ITEM: {
      let newState = [...state]
      const lineItemToRemove = newState.find(lineItem => lineItem.productId === action.productId)
      const indexToRemove = state.indexOf(lineItemToRemove)
      newState.splice(indexToRemove, 1)
      return newState
    }

    case CLEAR_LINE_ITEMS:
      return []

    default:
      return state
  }
}
