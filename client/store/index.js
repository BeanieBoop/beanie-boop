import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import categories from './categories'
import lineItems from './lineItems'
import orders from './orders'
import products from './products'
import reviews from './reviews'
import user from './user'


const reducer = combineReducers({
  categories,
  lineItems,
  orders,
  products,
  reviews,
  user
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
export * from './categories'
export * from './lineItems'
export * from './orders'
export * from './products'
export * from './reviews'
export * from './user'

