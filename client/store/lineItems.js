import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

export const CREATE_LINE_ITEM = 'CREATE_LINE_ITEM' // POST


/**
 * ACTION CREATORS
 */

export const createLineItem = lineItem => ({type: CREATE_LINE_ITEM, lineItem})


/**
 * THUNK CREATORS
 */


export const postLineItem = (formData) =>
  dispatch =>
    axios.post('/api/lineItems', formData)
      .then(res => res.data)
      .then(lineItem => {
        const action = createLineItem(lineItem);
        dispatch(action);
      })
      .catch(err => console.log(err))



/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case CREATE_LINE_ITEM:
      return [...state, action.lineItem]
    default:
      return state
  }
}
