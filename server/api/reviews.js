const router = require('express').Router();
const {Review} = require('../db/models')
module.exports = router

function isUser(req, res, next){
  if(req.user){
    next()
  } else {
    next('error')
  }
}

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Review.findOne({
    where: { id: req.params.id },
  })
    .then(review => res.json(review))
    .catch(next);
});

router.put('/:reviewId', isUser, (req, res, next) => {
	const {reviewId} = req.params;
	Review.update(req.body, {where: {id: reviewId}, returning: true})
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
