'use strict';
const router = require('express').Router();

const { Category } = require('../db/models');
const { Products } = require('../db/models');

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
.route('/:category')
  .get((req, res, next) => {
    Category.findAll({
      include: [
        {
          model: Products,
          as: 'products',
        },
      ],
    })
    .then(products => res.json(products))
    .catch(next);
});

module.exports = router;
