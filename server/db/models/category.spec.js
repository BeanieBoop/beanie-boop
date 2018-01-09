/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {

  beforeEach(() => {
    return db.sync({force: true})
    .then(() => {
      return Category.create({
        name: 'Limited Edition',
        description: 'This category is used to find all limited edition beanie babies.'
      })
    })
  })

    it('contains name and description', () => {
      Category.findById(1)
      .then(category => {
        expect(category.name).to.exist
        expect(category.description).to.exist
      })
      .catch(console.err)
    })

    describe('Validations', function () {
      let category;

      beforeEach(() => {
        category = Category.build()
      })

      it('errors without name', function () {
        return category.validate()
            .catch(err => {
                expect(err).to.exist
                expect(err.errors[0]).to.have.property('path', 'name')
            })
      })

    })

})
