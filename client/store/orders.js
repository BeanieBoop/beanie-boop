import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const GET_ORDERS = 'GET_ORDERS' // GET
export const CREATE_ORDER = 'CREATE_ORDER' // POST
export const EDIT_ORDER = 'EDIT_ORDER' // PUT
export const DELETE_ORDER = 'DELETE_ORDER' // DELETE

/**
 * ACTION CREATORS
 */
export const getOrders = orders => ({type: GET_ORDERS, orders})
export const createOrder = order => ({type: CREATE_ORDER, order})
export const editOrder = order => ({type: EDIT_ORDER, order})
export const deleteOrder = orderId => ({type: DELETE_ORDER, orderId})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders);
        dispatch(action);
      })
      .catch(err => console.log(err))

export const postOrder = (formData) =>
  dispatch =>
    axios.post('/api/orders', formData)
      .then(res => res.data)
      .then(order => {
        const action = createOrder(order);
        dispatch(action);
      })
      .catch(err => console.log(err))

export const putOrder = (orderId, formData) =>
  dispatch =>
    axios.put(`/api/orders/${orderId}`, formData)
      .then(res => res.data)
      .then(order => {
        const action = editOrder(order);
        dispatch(action);
        //history.push(`/orders/${order.id}`)  // redirects to newly-EDITED order page
      })
      .catch(err => console.log(err))

export const destroyOrder = (orderId) =>
  dispatch =>
    axios.delete(`/api/orders/${orderId}`)
      .then(() => {
        const action = deleteOrder(orderId);
        dispatch(action);
        history.push(`/orders`)  // redirects to all orders after delete
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {

    case GET_ORDERS:
      return action.orders

    case CREATE_ORDER:
      return [...state, action.order]

    case EDIT_ORDER: {
      const itemToEdit = state.find(order => order.id === action.order.id);
      const indexOfItemToEdit = state.indexOf(itemToEdit);
      let newState = [...state];
      newState.splice(indexOfItemToEdit, 1, action.order);
      return newState;
    }

    case DELETE_ORDER: {
      const itemToDelete = state.find(product => product.id === action.orderId);
      const indexOfItemToDelete = state.indexOf(itemToDelete);
      let newState = [...state];
      newState.splice(indexOfItemToDelete, 1);
      return newState;
    }

    default:
      return state
  }
}
