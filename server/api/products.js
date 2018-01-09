const router = require('express').Router();
const {Product} = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findOne({
		where: {id: req.params.id}
	})
    .then(product => res.json(product))
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
	const {productId} = req.params;
	Product.update(req.body, {where: {id: productId}, returning: true})
		.then(data => res.status(201).json(data[1]))
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(200).json(product))
    .catch(next)
})
