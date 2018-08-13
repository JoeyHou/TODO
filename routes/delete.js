var to_do_data = require("../to_do.json");

exports.deleteFriend = function(req, res) { 
	// Your code goes here

	var to_do_delete = req.body.to_do;
	var deadline_delete = req.body.deadline;
	var to_do_list = to_do_data.things_to_do;
	var i;
	for (i = 0; i<to_do_data.things_to_do.length; i++){
		if (to_do_list[i].to_do == to_do_delete &&
			to_do_list[i].deadline == deadline_delete){
				to_do_list.splice(i, 1);
				console.log(to_do_list);
			}
	}
	console.log(to_do_delete);
	console.log(deadline_delete);
	console.log(to_do_list);

	var task_done = {
		"to_do": to_do_delete,
		"deadline": deadline_delete
	};
	// console.log(task_done)
	to_do_data.things_done.push(task_done);
	res.render('index', to_do_data);
 }
