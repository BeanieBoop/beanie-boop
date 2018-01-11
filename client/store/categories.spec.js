// import action types
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from './categories';

// import action creators
import {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory
} from './categories';

// import thunk creators
import {
  fetchCategories,
  postCategory,
  putCategory,
  destroyCategory
} from './categories';

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

  describe('fetchCategories', () => {
    it('dispatches the GET_CATEGORIES action', () => {
      const fakeCategories = [
        {
          name: 'Scary Beanie Babies',
          description: 'Sharp teeth!'
        },
        {
          name: 'Cute Beanie Babies',
          description: 'No Sharp teeth!'
        }
      ];

      mockAxios.onGet('/api/categories').replyOnce(200, fakeCategories);

      return store.dispatch(fetchCategories()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal(GET_CATEGORIES);
        expect(actions[0].categories).to.be.deep.equal(fakeCategories);
      });
    });
  });

  describe('postCategory', () => {
    it('dispatches the CREATE_CATEGORY action', () => {
      const fakeNewCategory = {
        name: 'Super Scary Beanie Babies',
        description: 'Poisonous Sting!'
      };

      mockAxios
        .onPost('/api/categories', fakeNewCategory)
        .replyOnce(201, fakeNewCategory);

      return store.dispatch(postCategory(fakeNewCategory)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal(CREATE_CATEGORY);
        expect(actions[0].category).to.be.deep.equal(fakeNewCategory);
      });
    });
  });

  describe('putCategory', () => {
    it('dispatches the EDIT_CATEGORY action', () => {
      const fakeCategoryId = 2;

      const fakeUpdate = {
        description: "I'm an updated description"
      };

      const fakeUpdatedCategory = {
        id: 2,
        name: 'Blue Beanie',
        description: "I'm an updated description"
      };

      mockAxios
        .onPut(`/api/categories/2`, fakeUpdate)
        .replyOnce(204, fakeUpdatedCategory);

      return store
        .dispatch(putCategory(fakeCategoryId, fakeUpdate))
        .then(() => {
          const actions = store.getActions();
          console.log(actions);
          expect(actions[0].type).to.be.equal(EDIT_CATEGORY);
          expect(actions[0].category).to.be.deep.equal(fakeUpdatedCategory);
        });
    });
  });

  describe('destroyCategory', () => {
    it('dispatches the DELETE_CATEGORY action', () => {
      mockAxios.onDelete('/api/categories/1').replyOnce(204);

      return store.dispatch(destroyCategory(1)).then(() => {
        const actions = store.getActions();
        console.log(actions);
        expect(actions[0].type).to.be.equal(DELETE_CATEGORY);
        expect(actions[0].categoryId).to.be.deep.equal(1);
      });
    });
  });
});
