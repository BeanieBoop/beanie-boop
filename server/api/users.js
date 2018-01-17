const router = require('express').Router()

const {User,Order,LineItem,Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'email','createdAt', 'isAdmin'],
    include: {
      model: Order,
      include: {
        model: LineItem,
        include: [Product]
      }
    }
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/makeAdmin/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      const admin = user.isAdmin
      return user.update({isAdmin: !admin})
      }
    )
    .then(updated => res.status(202).json(updated))
    .catch(next);
});
