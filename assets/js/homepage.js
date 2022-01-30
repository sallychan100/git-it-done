var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};
getUserRepos();

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log(event);
  // get value from input element
  // trim() method removes whitespace from both ends of a string and returns a new string
  // value of nameInputEl DOM variable are stored at varaible 'username'
var username = nameInputEl.value.trim();

// check that there's a value in that username variable
// If there is a value, pass input data to getUserRepos() as an argument. 
if (username) {
  getUserRepos(username);
  nameInputEl.value = "";
} else {
  alert("Please enter a GitHub username");
}
};

userFormEl.addEventListener("submit", formSubmitHandler);