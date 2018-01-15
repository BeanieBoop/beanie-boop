/* global describe beforeEach afterEach it */

// import action types
import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  CHANGE_CATEGORY,
  CHANGE_SEARCH,
  CHANGE_ORDER
} from './products'

// import action creators
import {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  changeCategory,
  changeSearch,
  changeOrder
} from './products'

// import thunk creators
import {
  fetchProducts,
  postProduct,
  putProduct,
  destroyProduct
} from './products'

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
	beforeEach(() => {
    mockAxios = new MockAdapter(axios)
		store = mockStore()

	})

	afterEach(() => {
		store.clearActions()
	})


	describe('fetchProducts', () => {

		it('dispatches the GET_PRODUCTS action', () => {

			const fakeProducts = [
        {
          name: 'Blue Beanie',
          description: 'blooo',
          price: 2000,
          inventoryQuantity: 72,
          imgUrl: 'xyz.com'
        },
        {
          name: 'Red Beanie',
          description: 'reeeed',
          price: 12000,
          inventoryQuantity: 8,
          imgUrl: 'abc.com'
        }
      ]

			mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)

			return store.dispatch(fetchProducts())
				.then(() => {
          const actions = store.getActions()
					expect(actions[0].type).to.be.equal(GET_PRODUCTS)
					expect(actions[0].products).to.be.deep.equal(fakeProducts)
				})
    })
  })


  describe('postProduct', () => {

    it('dispatches the CREATE_PRODUCT action', () => {

      const fakeNewProduct = {
          name: 'Blue Beanie',
          description: 'blooo',
          price: 20000,
          inventoryQuantity: 72,
          imgUrl: 'xyz.com'
        }

      mockAxios.onPost('/api/products', fakeNewProduct).replyOnce(201, fakeNewProduct)

      return store.dispatch(postProduct(fakeNewProduct))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(CREATE_PRODUCT)
          expect(actions[0].product).to.be.deep.equal(fakeNewProduct)
        })
    })

  })


  describe('putProduct', () => {

    it('dispatches the EDIT_PRODUCT action', () => {

      const fakeProductId = 2

      const fakeUpdate = {
        price: 25000,
        inventoryQuantity: 65
      }

      const fakeUpdatedProduct = {
        id: 2,
        name: 'Blue Beanie',
        description: 'blooo',
        price: 25000,
        inventoryQuantity: 65,
        imgUrl: 'xyz.com'
      }

      mockAxios.onPut(`/api/products/2`, fakeUpdate).replyOnce(204, fakeUpdatedProduct)

      return store.dispatch(putProduct(fakeProductId, fakeUpdate))
        .then(() => {
          const actions = store.getActions()
          console.log(actions)
          expect(actions[0].type).to.be.equal(EDIT_PRODUCT)
          expect(actions[0].product).to.be.deep.equal(fakeUpdatedProduct)
        })
    })

  })



  describe('destroyProduct', () => {

    it('dispatches the DELETE_PRODUCT action', () => {

      mockAxios.onDelete('/api/products/1').replyOnce(204)

      return store.dispatch(destroyProduct(1))
        .then(() => {
          const actions = store.getActions()
          console.log(actions)
          expect(actions[0].type).to.be.equal(DELETE_PRODUCT)
          expect(actions[0].productId).to.be.deep.equal(1)
        })
    })

  })
  describe('filtering Product', () => {

    it('dispatches the CHANGE_CATEGORY action', () => {
      store.dispatch(changeCategory("test category"))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(CHANGE_CATEGORY)
      expect(actions[0].category).to.be.deep.equal("test category")
    })
    it('dispatches the CHANGE_SEARCH action', () => {
      store.dispatch(changeSearch("test search"))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(CHANGE_SEARCH)
      expect(actions[0].search).to.be.deep.equal("test search")
    })
    it('dispatches the CHANGE_ORDER action', () => {
      store.dispatch(changeOrder("test order"))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(CHANGE_ORDER)
      expect(actions[0].order).to.be.deep.equal("test order")
    })

  })


})
