const express = require('express');
const router = express.Router();	
const Ninja = require('../models/ninja')

// get a list of ninjas from database
router.get('/ninjas',function(req, res, next) {
    /*Ninja.find({}).then((ninjas) => {
    	res.send(ninjas);
    })*/

    Ninja.geoNear(
	    {
	    	type: "Point",
	    	coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
	    },
	    {
	    	maxDistance: 100000, spherical: true
	    }
    ).then((ninjas) => {
    	res.send(ninjas);
    });
});

// add a new ninja to database
router.post('/ninjas',function(req, res, next) {
	Ninja.create(req.body).then((ninja) => {
		res.send(ninja);	
	}).catch(next);
    
});

// update a ninja in the database
router.put('/ninjas/:id',function(req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
		Ninja.findOne({_id: req.params.id}).then((ninja) => {
			res.send(ninja);	
		});	
	}).catch(next);
});

// delete a ninja from database
router.delete('/ninjas/:id',function(req, res, next) {
	Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja) => {
		res.send(ninja);	
	}).catch(next);
	
});

module.exports = router;