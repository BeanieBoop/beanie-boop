'use strict';
const router = require('express').Router();

const { Category } = require('../db/models');

// prettier-ignore
router
  .route('/')
  .get((req, res, next) => {
    Category.findAll()
      .then(categories => res.json(categories))
      .catch(next);
  });

// prettier-ignore
router
.route('/:categoryId')
  .get((req, res, next) => {
    Category.findOne({
      where: {
        id: req.params.categoryId
      }
    })
    .then(category => res.json(category))
    .catch(next);
});

module.exports = router;
