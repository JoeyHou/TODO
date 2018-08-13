'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$('.done').on('click', delete_task);
	$("#addFriendForm").on('submit', handleSubmission);
	// var n = new Date();
	// var y = n.getFullYear();
	// var m = n.getMonth() + 1;
	// var d = n.getDate();
	// document.getElementById("date").innerHTML = n;

})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
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
	var task_name = $(this).parent().find('a').find('h4').html();
	var task_deadline = $(this).parent().find('p').html();
	var deferred = $.post("/delete", {'todo':task_name, 'deadline':task_deadline});

	deferred.success(function () {
		$.get("/");
		location.reload();
		console.log("Deleted");
	});

}
