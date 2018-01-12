/* global describe beforeEach afterEach it */

// import action types
import {
  GET_ORDERS,
  CREATE_ORDER,
  EDIT_ORDER,
  DELETE_ORDER
} from './orders'

// import action creators
import {
  getOrders,
  createOrder,
  editOrder,
  deleteOrder
} from './orders'

// import thunk creators
import {
  fetchOrders,
  postOrder,
  putOrder,
  destroyOrder
} from './orders'

import { expect } from 'chai'
import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {

  let store
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

	beforeEach(() => {
    store = mockStore()
	})

	afterEach(() => {
		store.clearActions()
	})


	describe('fetchOrders', () => {

		it('dispatches the GET_ORDERS action', () => {

			const fakeOrders = [
        {
          status: 'open'
        },
        {
          status: 'in-progress'
        }
      ]

			mockAxios.onGet('/api/orders').replyOnce(200, fakeOrders)

			return store.dispatch(fetchOrders())
				.then(() => {
          const actions = store.getActions()
          console.log(actions)
					expect(actions[0].type).to.be.equal(GET_ORDERS)
					expect(actions[0].orders).to.be.deep.equal(fakeOrders)
				})
    })
  })


  describe('postOrder', () => {

    it('dispatches the CREATE_ORDER action', () => {

      const fakeNewOrder = {
          status: 'open'
        }

      mockAxios.onPost('/api/orders', fakeNewOrder).replyOnce(201, fakeNewOrder)

      return store.dispatch(postOrder(fakeNewOrder))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(CREATE_ORDER)
          expect(actions[0].order).to.be.deep.equal(fakeNewOrder)
        })
    })

  })


  describe('putOrder', () => {

    it('dispatches the EDIT_ORDER action', () => {

      const fakeOrderId = 2

      const fakeUpdate = {
        status: 'in-progress'
      }

      const fakeUpdatedOrder = {
        id: 2,
        status: 'in-progress'
      }

      mockAxios.onPut(`/api/orders/2`, fakeUpdate).replyOnce(204, fakeUpdatedOrder)

      return store.dispatch(putOrder(fakeOrderId, fakeUpdate))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(EDIT_ORDER)
          expect(actions[0].order).to.be.deep.equal(fakeUpdatedOrder)
        })
    })

  })



  describe('destroyOrder', () => {

    it('dispatches the DELETE_ORDER action', () => {

      mockAxios.onDelete('/api/orders/1').replyOnce(204)

      return store.dispatch(destroyOrder(1))
        .then(() => {
          const actions = store.getActions()
          console.log(actions)
          expect(actions[0].type).to.be.equal(DELETE_ORDER)
          expect(actions[0].orderId).to.be.deep.equal(1)
        })
    })

  })


})
