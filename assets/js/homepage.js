var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// what is function(event)
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  // trim() method removes whitespace from both ends of a string and returns a new string
  // value of nameInputEl DOM variable are stored at varaible 'username'
  var username = nameInputEl.value.trim();  
// check that there's a value in that username variable
// If there is a value, pass input data to getUserRepos() as an argument. 
// Then, to clear the form, we clear out the <input> element's value
  if (username) {
    getUserRepos(username); //data is passed on to function? 
    // clear old content
    repoContainerEl.textContent = '';
    nameInputEl.value = "";
    } else {
    alert("Please enter a GitHub username");
    }
};

var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  // the response itself is an array of objects, 
  // with each object holding one repository's data.
  // format response into json 
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    //catch method added 
    .catch(function(error) {
      alert('Unable to connect to GitHub');
    });
};

// Create a Function to Display Repos
var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
      repoContainerEl.textContent = 'No repositories found.';
      return;
    }
  
  //define parameter searchTerm
  repoSearchTerm.textContent = searchTerm;

    // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a <div> container called repoEl for each repo
    // then style that <div> 
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element called titleEl to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append titleEl <div> to container repoEl
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';
    
    // check if current repo has issues or not
    // icons are from fontawesome.com
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    
    // append to container
    repoEl.appendChild(statusEl);


    // append container to the dom using appendChild method
    repoContainerEl.appendChild(repoEl);
  }
};


// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);

