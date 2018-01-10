'use strict';
const router = require('express').Router();

const { Order } = require('../db/models');

router
  .route('/')
  .get((req, res, next) => {
    Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  })
  .post((req, res, next) => {
    Order.create(req.body)
      .then(orders => res.status(201).json(orders))
      .catch(next);
  });

router
  .route('/:orderId')
  .get((req, res, next) => {
    Order.findOne({
      where: {
        id: req.params.orderId,
      },
    })
      .then(order => res.json(order))
      .catch(next);
  })
  .put((req, res, next) => {
    Order.findById(req.params.id)
      .then(order => order.update(req.body))
      .then(updated => res.status(201).json(updated))
      .catch(next);
  })
  .delete((req, res, next) => {
    req.params.orderId.destroy().then(() => res.status(204).end());
  });

module.exports = router;
