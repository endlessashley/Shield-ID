
  document.getElementById("submit").addEventListener("click",function() {
    event.preventDefault();
    let input = document.getElementById('searchInput').value
    // var input = document.getElementById("searchInput").value;
    loadJSONFile(input);
    loadGifs(input);
    addHistory();
})



var heroAPI = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4431251130239326/search/";
var giphyAPI = "https://api.giphy.com/v1/gifs/search?q=";
var apikey = "&api_key=XnUlKSQw33KcHiZVIv8ReqDGr7nJZwCS&limit=3";
var firstSearch = false;
var li 



function loadJSONFile(input) {
  console.log(input)
  console.log("step 1 done.")
  var searchURL = heroAPI + input;
  console.log(searchURL);
  fetch(searchURL)
    .then(function (response) {
      return response.json();
    })
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

      loadGifs(data.results[0].name)
    
    
    })

};

function loadGifs(input){
  //let input = document.getElementById('searchInput').value
  var searchURL2 = giphyAPI + input + apikey;
  console.log(searchURL2);
  fetch(searchURL2)
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data){
    console.log(data);
    document.getElementById("gif1").setAttribute("src", data.data[0].images.original.url);
    document.getElementById("gif2").setAttribute("src", data.data[1].images.original.url);
    document.getElementById("gif3").setAttribute("src", data.data[2].images.original.url);
  })
}

console.log("step 3 done.");

var addToSearchHistory = document.querySelector('#add-to-search-history');
var searchItem = document.querySelector('#searchInput');
var searchList = document.querySelector('#search-list');



function addHistory(event) {
  console.log("testing")
  // Don't submit the form
  // Ignore it if the search item is empty
  if (searchItem.value.length < 1) return;
  console.log(searchItem.value)
  // Add item to search list
  //searchList.innerHTML += '<li>' + searchItem.value + '</li>';
  var saved = JSON.parse(localStorage.getItem('searchItems'));
  console.log(saved)
  if (!saved) {
    saved = []
  };

  if (saved.length === 3) {
    saved.shift()
  }
  saved.push(searchItem.value)
  // Clear input
  searchItem.value = '';

  // Save the list to localStorage
  localStorage.setItem('searchItems', JSON.stringify(saved));
  displayHistory()
};


function displayHistory() {
  var saved = JSON.parse(localStorage.getItem('searchItems'));
  
  console.log(saved)
  searchList.innerHTML ="";
  if(!saved){
    return
  };
  if (!firstSearch) {
    firstSearch = true
    loadJSONFile(saved[saved.length - 1])
  }
  for (var i = 0; i < saved.length; i++) {
    var character = saved[i];
    console.log(character)
    var stringedName = '"' + character +'"'
    var li = "<button value=" + character + " onclick='loadJSONFile("+stringedName+")'>" + character + "</button>"
    searchList.innerHTML = searchList.innerHTML + li
    
  }
}


displayHistory()