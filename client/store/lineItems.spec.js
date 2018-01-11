// import action types
import {
  CREATE_LINE_ITEM
} from './lineItems';

// import action creators
import {
  createLineItem,
} from './lineItems';

// import thunk creators
import {
  postLineItem,
} from './lineItems';

import { expect } from 'chai';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  before(() => {
    mockAxios = new MockAdapter(axios);
  });

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    store.clearActions();
  });



  describe('postLineItem', () => {
    it('dispatches the CREATE_LINE_ITEM action', () => {
      const fakeNewLineItem = {
					productId: 1,
					orderId: 1,
					unitPrice: 35,
					quantity: 5
      };

      mockAxios
        .onPost('/api/lineItems', fakeNewLineItem)
        .replyOnce(201, fakeNewLineItem);

      return store.dispatch(postLineItem(fakeNewLineItem)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal(CREATE_LINE_ITEM);
        expect(actions[0].lineItem).to.be.deep.equal(fakeNewLineItem);
      });
    });
  });
});
