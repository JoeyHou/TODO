// Get all of our friend data
var to_do_data = require('../to_do.json');

exports.view = function(req, res){
	// console.log(data);
	res.render('index', to_do_data);
};
