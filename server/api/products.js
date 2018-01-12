const router = require('express').Router();
const { Product, Category, Review } = require('../db/models');
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
  Product.findAll({
    order: [['id', 'ASC']],
    include: [Category, Review]
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findOne({
    where: { id: req.params.id },
    include: [Category, Review]
  })
    .then(product => res.json(product))
    .catch(next);
});


router.put('/:id', isAdmin, (req, res, next) => {
  const { id } = req.params;
  Product.update(req.body, { where: { id: id }, returning: true }).then(data => res.status(200).json(data[1]));
});


router.post('/', isAdmin, (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
});

router.delete('/:id', isAdmin, (req, res, next) => {
  const { id } = req.params;
  Product.destroy({ where: { id: id } })
    .then(data => res.status(202).json(data))
    .catch(next);
});
