'use strict';
const router = require('express').Router();
const { Category } = require('../db/models');
module.exports = router;


function isAdmin(req, res, next) {
  if (req.user) {
    if (req.user.isAdmin) next();
    else {
      next('not an admin');
    }
  } else {
    next('not an user');
  }
}

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(category => res.json(category))
    .catch(next);
});

router.put('/:id', isAdmin, (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => category.update(req.body))
    .then(updated => res.status(202).json(updated))
    .catch(next);
});

router.post('/', isAdmin, (req, res, next) => {
  Category.create(req.body)
    .then(category => res.status(202).json(category))
    .catch(next);
});

router.delete('/:id', isAdmin, (req, res, next) => {
  Category.destroy({ where: { id: req.params.id } }).then(data => res.status(202).json(data));
});
