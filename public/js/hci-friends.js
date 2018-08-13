'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$('.done').on('click', delete_task);
	$("#addTaskForm").on('submit', handleSubmission);


})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	initializeBackground();
	initializeDate();
}

function initializeBackground(){
	// initialize background
	var img = "url(../img/" + (Math.floor(Math.random() * 6 ) + 1).toString() + ".jpg)";
	$('body').css('background-image', img);

}

function initializeDate(){
	// initialize showDate
	var n = new Date();
	var d = n.getDate();
	var month_dic = {
		1: 'Jan.',
		2: 'Feb.',
		3: 'Mar.',
		4: 'Apr.',
		5: 'May',
		6: 'Jun.',
		7: 'Jul.',
		8: 'Aug.',
		9: 'Sep.',
		10: 'Oct.',
		11: 'Nov.',
		12: 'Dec.'
	}
	var m = n.getMonth() + 1;
	console.log(month_dic[m]);
	$("#date").html('Today is: ' + month_dic[m] + ' ' + d.toString() + '<span class="blink">_</span>');
}

function handleSubmission(event) {
	event.preventDefault();
	var to_do = $(this).find('#input_to_do').val();
	var deadline = $(this).find('#input_deadline').val();
	// I like to use defers :)
	var deferred = $.post("/add", { 'to_do': to_do, 'deadline': deadline });

	deferred.success(function () {
		$.get("/");
		location.reload();
		console.log("Form completed");
	});

	deferred.error(function () {
		alert('Error!');
		location.reload();
		console.log("Error!");
	});
	location.reload();
}

function delete_task(event){
	event.preventDefault();
	var task_name = $(this).find('div').html();
	var task_deadline = $(this).find('p').html();
	console.log(task_name);
	var deferred = $.post("/delete", {'to_do':task_name, 'deadline':task_deadline});

	deferred.success(function () {
		$.get("/");
		location.reload();
		console.log("Deleted");
	});

}
