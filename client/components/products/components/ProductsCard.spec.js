import ProductsCard from './ProductsCard'
import { expect } from 'chai'
import React from 'react'
import { shallow,mount,render } from 'enzyme'

describe('ProductsCard', () =>{
	let card
	let fakeProduct = {
		id: 1,
		name: "Princes Diana Purple Bear",
		description: "Felis concolor",
		price: 7500000,
		inventoryQuantity: 5,
		imgUrl: "/pictures/c3po.jpg",
		createdAt: "2018-01-13T16:45:04.342Z",
		updatedAt: "2018-01-13T16:45:04.342Z",
		categoryId: 2,
		reviews: []
	}
	beforeEach(() => {
		card = shallow(<ProductsCard product={fakeProduct}/>)
	})
	it('ProductsCard component', () => {
		expect(card.find('Image').length).to.be.equal(1)
		expect(card.find('Image').prop('src')).to.be.equal('/pictures/c3po.jpg')
	})

})
