//executes function based on button click and text input on form
document.getElementById("submit").addEventListener("click", function () {
  event.preventDefault();
  let input = document.getElementById('searchInput').value
  loadJSONFile(input);
  addHistory();
})


//global variables used for APIs which will be edited and executed in respective functions
//based on user input
var heroAPI = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4431251130239326/search/";
var giphyAPI = "https://api.giphy.com/v1/gifs/search?q=";

//apikey limit=3 specifies only the top 3 gif hits for API fetch
var apikey = "&api_key=XnUlKSQw33KcHiZVIv8ReqDGr7nJZwCS&limit=3";

//initial check condition to see if it is user's first search/first
//time using program
var firstSearch = false;



// laods the JSON data from HeroAPI
function loadJSONFile(input) {
  console.log(input)
  console.log("step 1 done.")
  //combines set variable with the input to create the url used for the search
  var searchURL = heroAPI + input;
  console.log(searchURL);
  fetch(searchURL)
    .then(function (response) {
      return response.json();
    })
  //fills in the data fields using the given parameters
    .then(function (data) {
      console.log(data);
      console.log(data.results[0].name);
      console.log(data.results[0].id);
      document.getElementById("hero-name").innerHTML = data.results[0].name;
      document.getElementById("aliases").innerHTML = "AKA:  " + data.results[0].biography.aliases[0];
      document.getElementById("full-name").innerHTML = "Full name:  " + data.results[0].biography["full-name"];
      console.log(data.results[0].image.url);
      document.getElementById("thumbnailpic").setAttribute("src", data.results[0].image.url);
      console.log(data.results[0].biography);
      document.getElementById("race").innerHTML = data.results[0].appearance.race;
      document.getElementById("height").innerHTML = "Height:  " + data.results[0].appearance.height[0];
      document.getElementById("weight").innerHTML = "Weight:  " + data.results[0].appearance.weight[0];
      document.getElementById("job").innerHTML = "Occupation:  " + data.results[0].work.occupation;
      console.log(data.results[0].powerstats);
      document.getElementById("combat").innerHTML = "Combat:" + data.results[0].powerstats.combat;
      document.getElementById("durability").innerHTML = "Durability:  " + data.results[0].powerstats.durability;
      document.getElementById("intelligence").innerHTML = "Intelligence:  " + data.results[0].powerstats.intelligence;
      document.getElementById("power").innerHTML = "Power:  " + data.results[0].powerstats.power;
      document.getElementById("speed").innerHTML = "Speed:  " + data.results[0].powerstats.speed;
      document.getElementById("strength").innerHTML = "Strength:  " + data.results[0].powerstats.strength;
      document.getElementById("first").innerHTML = data.results[0].biography["first-appearance"];

      //calls loadGifs using hero name from fetched data
      loadGifs(data.results[0].name)


    })

};

//loads gifs based on user input into function
function loadGifs(input) {

  //concatanates giphy URL to be fetched  
  var searchURL2 = giphyAPI + input + apikey;
  console.log(searchURL2);

  //fetch call
  fetch(searchURL2)
    .then(function (response) {

      //returns response of API fetch in object form after fetch
      return response.json();
    })

    //once json response is returned then specific URLs are added to the sources of
    // html img elements gif1-3 in order for gifs to appear on page
    .then(function (data) {
      console.log(data);
      document.getElementById("gif1").setAttribute("src", data.data[0].images.original.url);
      document.getElementById("gif2").setAttribute("src", data.data[1].images.original.url);
      document.getElementById("gif3").setAttribute("src", data.data[2].images.original.url);
    })
}

console.log("step 3 done.");

//used to select form input
var searchItem = document.querySelector('#searchInput');

//used to select container to hold searchItems
var searchList = document.querySelector('#search-list');


//adds text input on form into local storage
function addHistory(event) {

  //Ignores/exits function if search item is empty
  if (searchItem.value.length < 1) return;
  console.log(searchItem.value)

  //used to create a variable 
  //that hold list of searchItems in localStorage or parses
  //stringified list of items in local storage into a list
  var saved = JSON.parse(localStorage.getItem('searchItems'));
  console.log(saved)

  //if saved value is null/false set value to empty list
  //since no searchItems have been added
  if (!saved) {
    saved = []
  };

  //if there are 3 searchItems remove the oldest
  //in order to make room for new item/limit list length
  if (saved.length === 3) {
    saved.shift()
  }
  //push new searchItem's value into list
  saved.push(searchItem.value)

  // Clear input
  searchItem.value = '';

  // saves list to localStorage as a string
  localStorage.setItem('searchItems', JSON.stringify(saved));

  //function to create buttons of search items
  displayHistory()
};


function displayHistory() {
  //parse saved searchItems string from local storage to a list
  var saved = JSON.parse(localStorage.getItem('searchItems'));
  console.log(saved)

  //resets html to contain no buttons
  searchList.innerHTML = "";

  //exit function if no searchItems present in list
  if (!saved) {
    return
  };

  //if it is not users first time using app,
  //automatically loads user's last search
  if (!firstSearch) {
    firstSearch = true
    loadJSONFile(saved[saved.length - 1])
  }

  //adds buttons for each search item onto html 
  //each button click executes loadJSONFile function which populates page with respective
  //API info
  for (var i = 0; i < saved.length; i++) {
    var character = saved[i];
    console.log(character)
    var stringedName = '"' + character + '"'
    var li = "<button value=" + character + " onclick='loadJSONFile(" + stringedName + ")'>" + character + "</button>"
    searchList.innerHTML = searchList.innerHTML + li

  }
}


displayHistory()
