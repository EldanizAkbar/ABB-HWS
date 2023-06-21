// Function to send request via Ajax
function sendRequest(url, method, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response);
      } else {
        console.error("Error happened. Status code :", xhr.status);
      }
    }
  };
  xhr.open(method, url);
  xhr.send();
}

// Function to display the movies and characters on the screen
function createMovies(movies) {
  // Function to sort movies in order
  movies.sort(function (a, b) {
    return a.episodeId - b.episodeId;
  });

  var moviesContainer = document.getElementById("movies-container");

  movies.forEach(function (movie) {
    // First Create movie
    var movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");

    // Create title for movie
    var title = document.createElement("h2");
    title.innerText = "Episode " + movie.episodeId + ": " + movie.name;
    movieContainer.appendChild(title);

    // Create description for movie
    var description = document.createElement("p");
    description.innerText = movie.openingCrawl;
    movieContainer.appendChild(description);

    // Create cast title for movie
    var cast = document.createElement("h3");
    cast.innerText = "Cast:";
    movieContainer.appendChild(cast);

    // Create characters container for movie
    var charactersList = document.createElement("ul");
    movieContainer.appendChild(charactersList);

    // Create loading animation before loading of all characters
    var loading = document.createElement("div");
    loading.classList.add("loading");
    movieContainer.appendChild(loading);

    moviesContainer.appendChild(movieContainer);

    var charactersLoaded = 0;
    var totalCharacters = movie.characters.length;

    movie.characters.forEach(function (characterAPI) {
      sendRequest(characterAPI, "GET", function (character) {
        var characterLi = document.createElement("li");
        characterLi.innerText = character.name;
        charactersList.appendChild(characterLi);

        charactersLoaded++;

        // check if all characters are loaded and then hide loading animation
        if (charactersLoaded === totalCharacters) {
          loading.style.display = "none";
        }
      });
    });
  });
}

// Send API request via Ajax
sendRequest(
  "https://ajax.test-danit.com/api/swapi/films",
  "GET",
  function (response) {
    createMovies(response);
  }
);
