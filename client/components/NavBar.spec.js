import NavBar from './NavBar'
import { expect } from 'chai'
import React from 'react'
import { shallow,mount,render } from 'enzyme'

describe('NavBar', () =>{
	let navbar
	beforeEach(() => {
		navbar = shallow(<NavBar loggedIn={true}/>)
	})
	it('component', () => {
		expect(navbar.find('img').prop('src')).to.be.equal('ty-logo.png')
		expect(navbar.find('TiShoppingCart').length).to.be.equal(1)
	})
	describe('Logged-In', () =>{
		it('person Icon', () => {
			expect(navbar.find('TiUserOutline').length).to.be.equal(1)
		})
	})
	describe('Logged-Out', () =>{
		beforeEach(() => {
			navbar = shallow(<NavBar loggedIn={false}/>)
		})
		it('person Icon', () => {
			expect(navbar.find('TiUserOutline').length).to.be.equal(0)
		})
	})
})
