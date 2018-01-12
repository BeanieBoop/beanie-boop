const router = require('express').Router();
const { Review, Product, User} = require('../db/models')
module.exports = router

function isUser(req, res, next){
  if(req.user){
    next()
  } else {
    next('error')
  }
}

router.get('/', (req, res, next) => {
  Review.findAll({
    include: [Product, User]
  })
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Review.findOne({
    where: { id: req.params.id },
    include: [Product, User]
  })
    .then(review => res.json(review))
    .catch(next);
});

router.put('/:id', isUser, (req, res, next) => {
	const { id } = req.params;
	Review.update(req.body, {where: { id }, returning: true})
		.then(data => res.status(200).json(data[1]))
});

router.post('/', isUser, (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next);
});

router.delete('/:id', (req, res) => {
  Review.destroy({ where: { id: req.params.id } }).then(data => res.status(204).end());
});
