'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$('.done').on('click', delete_task);
	$("#addFriendForm").on('submit', handleSubmission);

	// $("#addFriendForm").bind('ajax:complete', function() {
	// 	$.get("/");
	// 	alert('hi!');
	// 	location.reload();
	// 	console.log("Form completed");
   // });
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

	// alert('hi!');
	// location.reload();
}

function anagrammedName(name) {
	// Thanks, Internet Anagram Server!

	if (name == "Doug Engelbart") {
		return "Notable Grudge";
	}
	else if (name == "Ivan Sutherland") {
		return "Vandal Heist Run";
	}
	else if (name == "JCR Licklider") {
		return "Crick Rid Jell";
	}
	else if (name == "Vannevar Bush") {
		return "Ravens Van Hub";
	}
	else if (name == "Alan C. Kay") {
		return "Canal Yak";
	}
	else if (name == "Allen Newell") {
		return "Ellen All New";
	}
	else if (name == "Lucy Suchman") {
		return "Lunacy Chums";
	}
	else if (name == "Grace Hopper") {
		return "Gear Chopper";
	}
	else {
		console.log(name + " not known for anagramming.");
		return name;
	}
}
