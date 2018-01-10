const router = require('express').Router();
const {LineItem} = require('../db/models');
const {Order} = require('../db/models')
module.exports = router


router.post('/', (req, res, next) => {
  const {orderId} = req.body
	if(orderId){
		LineItem.create(req.body)
		.then(lineItem => res.status(201).json(lineItem))
    .catch(next)
	}
	else {
		Order.create()
		.then((order) => {
			LineItem.create({...req.body, orderId: order.id})
			.then(lineItem => res.status(201).json(lineItem))
	    .catch(next)
		})
	}
})
