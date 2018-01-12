'use strict';
const router = require('express').Router();
const { Order, User } = require('../db/models');
module.exports = router;

function isUser(req, res, next){
  if (req.user){
    next()
  } else {
    next('error')
  }
}

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [User]
  })
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.id,
    },
    include: [User]
  })
    .then(order => res.json(order))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updated => res.status(202).json(updated))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(orders => res.status(202).json(orders))
    .catch(next);
});

router.delete('/:id', isUser, (req, res, next) => {
  Order.destroy({ where: { id: req.params.id } }).then(data => res.status(202).json(data));
});
