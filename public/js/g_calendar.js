/**
 *  Date Created: Aug. 15, 2018
 *  This file is from Google Calendar API website: https://developers.google.com/calendar/quickstart/js
 *  I modified part of it to accommodate my website.
 *  It connects to user's Google Calender and copy the upcoming events to the index page.
 */

// Client ID and API key from the Developer Console
var CLIENT_ID = '260561153130-9prn7llq8lajocnbuifpej6e49omcof9.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAJ4LdDgXpzk7yPg1YuRFqow6UZIk5DIgc';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 * @param {string} id Html id to append the message.
 */
function appendPre(message, id) {
    var pre = $('#' + id);
    var current = pre.html();
    pre.html(current + '<div class="event_card"><p class="event_content">' + message + '</p></div>');
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        // appendPre('Upcoming events:');
        var today_date = new Date().toISOString().substring(0,10);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tomorrow_date = tomorrow.toISOString().substring(0,10)
        var event_count = [0, 0, 0];
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var event_date = event.start.dateTime;
                if (!event_date) {
                    event_date = event.start.date;
                    var event_time = 'All Day';
                } else {
                    event_date = event.start.dateTime.substring(0,10);
                    var event_time = event.start.dateTime.substring(11, 16);
                }

                if (event_date == today_date){
                    event_count[0] += 1;
                    appendPre(event.summary, 'today_events');
                } else if (event_date == tomorrow_date){
                    event_count[1] += 1;
                    appendPre(event.summary, 'tomorrow_events');
                } else {
                    event_count[2] += 1;
                    appendPre(event.summary + '(' + event_date + ')', 'future_events');
                }
            }

            if (event_count[0] == 0){
                $('#today_events').html('<p class="event_content">No event today. Have Fun! :)</p>', 'today_events');
            }

            if (event_count[1] == 0){
                $('#tomorrow_events').html('<p class="event_content">No event tomorrow. Lucky You! >_< </p>', 'tomorrow_events');
            }

            if (event_count[2] == 0){
                $('#future_events').html('<p class="event_content">No event in foreseeable future. Why not take a trip?</p>', 'future_events');
            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}
