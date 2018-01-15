/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductInfo } from './single-product';
import { Card, Loader } from 'semantic-ui-react';

/*
Questions:
Should we be importing a model from db to test a Single Product or hard code it
Should we be testing the Card component vs using userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
*/
const adapter = new Adapter();
enzyme.configure({ adapter });

describe('ProductInfo', () => {
  let card;

  beforeEach(() => {
    card = shallow(<Card
                    image={}
                    name={}
                    description={}
                    price={}
                    >)
  });

  it('renders one product based upon a id', () => {
    expect(card.find('image').to.be.equal(''));
    expect(card.find('name').to.be.equal(''));
    expect(card.find('description').to.be.equal(''));
    expect(card.find('price').to.be.equal(''));

  });
});
