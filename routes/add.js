var to_do_data = require("../to_do.json");

exports.addFriend = function(req, res) { 
	// Your code goes here
	// console.log(data.things_to_do.length);
	if(req.body.todo != ''){
		var new_json = {
			"to_do": req.body.to_do,
			"deadline": req.body.deadline
		};
		to_do_data.things_to_do.push(new_json);
		res.render('index', to_do_data);
	} else {
		res.render('index', to_do_data);
	}
 }
