const router = require('express').Router();
const {Review} = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:reviewId', (req, res, next) => {
  Review.findOne({
		where: {id: req.params.reviewId}
	})
    .then(review => res.json(review))
    .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
	const {reviewId} = req.params;
	Review.update(req.body, {where: {id: reviewId}, returning: true})
		.then(data => res.status(200).json(data[1]))
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next)
})
router.delete('/:reviewId', (req, res) => {
	const {reviewId} = req.params;
	Review.destroy({where: {id: reviewId}})
	.then(data => res.status(204).end());
});
