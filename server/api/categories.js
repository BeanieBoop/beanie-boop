'use strict';
const router = require('express').Router();

const { Category } = require('../db/models');

router
  .route('/')
  .get((req, res, next) => {
    Category.findAll()
      .then(categories => res.json(categories))
      .catch(next);
  })
  .post((req, res, next) => {
    Category.create(req.body)
      .then(category => res.status(201).json(category))
      .catch(next);
  });

router
  .route('/:categoryId')
  .get((req, res, next) => {
    Category.findOne({
      where: {
        id: req.params.categoryId,
      },
    })
      .then(category => res.json(category))
      .catch(next);
  })
  .put((req, res, next) => {
    Category.findById(req.params.id)
      .then(category => category.update(req.body))
      .then(updated => res.status(201).json(updated))
      .catch(next);
  })
  .delete((req, res, next) => {
    req.params.categoryId.destroy().then(() => res.status(204).end());
  });

module.exports = router;
