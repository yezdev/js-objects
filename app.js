// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// Retrieve stringified jokes object from local local storage
var stringifiedJokes = window.localStorage.getItem('jokes')

// Check if user has saved jokes
if (stringifiedJokes === null || stringifiedJokes === undefined) {
  stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  jokes = JSON.parse(stringifiedJokes)
} else {
  jokes = JSON.parse(stringifiedJokes)
}

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  jokeBox.textContent = requestedJokeKey

  // Display joke if it exists
  if (jokes[requestedJokeKey]) {
    var setup = jokes[requestedJokeKey].setup
    var punchline = jokes[requestedJokeKey].punchline
    var jokeContent =
    '<p>' + setup + '</p>' +
    '<p>' + punchline + '</p>'
    jokeBox.innerHTML = jokeContent
  } else {
    jokeBox.textContent = 'No matching joke found'
  }
}

// Update the jokes object when user adds a new joke
var newJokeAbout = document.getElementById('new-joke-about')
var newJokeSetup = document.getElementById('new-joke-setup')
var newJokePunchline = document.getElementById('new-joke-punchline')
var newJokeBtn = document.getElementById('new-joke-btn')
var rememberNewJoke = function () {
  var requestedJokeAbout = newJokeAbout.value

  // Verify that inputs are not empty
  if (requestedJokeAbout) {
    var requestedJokeSetup = newJokeSetup.value
    if (requestedJokeSetup) {
      var requestedJokePunchline = newJokePunchline.value
      if (requestedJokePunchline) {
        // Create new object inside jokes object
        jokes[requestedJokeAbout] = {
          setup: requestedJokeSetup,
          punchline: requestedJokePunchline
        }
      }
    }
  }

  // Save new jokes object to local storage and update page
  stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  updatePage()
}

// Delete a joke from the joke object per user request
var jokeToDelete = document.getElementById('joke-to-delete')
var deleteJokeBtn = document.getElementById('delete-joke-btn')
var deleteJoke = function () {
  var requestedJokeToDelete = jokeToDelete.value
  // Verify that input is not empty
  if (requestedJokeToDelete) {
    delete jokes[requestedJokeToDelete]
  }

  // Save new jokes object to local storage and update page
  stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  updatePage()
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

// Add new joke to object when user clicks button
newJokeBtn.addEventListener('click', rememberNewJoke)

// Delete a requested joke object when users clicks button
deleteJokeBtn.addEventListener('click', deleteJoke)
