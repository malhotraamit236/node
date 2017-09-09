const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongoDB
mongoose.connect('mongodb://kpi:kpi@ds129004.mlab.com:29004/kpi');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
	//console.log(err);
	res.status(422).send({error: err._message});
});

// listen for requests
app.listen(process.env.PORT || '4000', () => {
	console.log('now listening for requests');
});
