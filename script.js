
  document.getElementById("submit").addEventListener("click",function() {
    event.preventDefault();
    // var input = document.getElementById("searchInput").value;
    loadJSONFile();
    loadGifs();
})



var heroAPI = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4431251130239326/search/";
var giphyAPI = "https://api.giphy.com/v1/gifs/search?q=";
var apikey = "&api_key=XnUlKSQw33KcHiZVIv8ReqDGr7nJZwCS&limit=3";



function loadJSONFile() {
  let input = document.getElementById('searchInput').value
  console.log(input)
  console.log("step 1 done.")
  var searchURL = heroAPI + input;
  fetch(searchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results[0].name);
      console.log(data.results[0].id);
      document.getElementById("hero-name").innerHTML = data.results[0].name;
      console.log(data.results[0].image.url);
      document.getElementById("thumbnailpic").setAttribute("src", data.results[0].image.url);
      console.log(data.results[0].biography);
      document.getElementById("hero-bio").innerHTML = "here is the publisher:" + data.results[0].biography.publisher;
      document.getElementById("job").innerHTML = "Occupation:" + data.results[0].work.occupation;
      console.log(data.results[0].powerstats);
      document.getElementById("combat").innerHTML = "Combat:" + data.results[0].powerstats.combat;
      document.getElementById("durability").innerHTML = "Durability:  " + data.results[0].powerstats.durability;
      document.getElementById("intelligence").innerHTML = "Intelligence:  " + data.results[0].powerstats.intelligence;
      document.getElementById("power").innerHTML = "Power:  " + data.results[0].powerstats.power;
      document.getElementById("speed").innerHTML = "Speed:  " + data.results[0].powerstats.speed;
      document.getElementById("strength").innerHTML = "Strength:  " + data.results[0].powerstats.strength;
      document.getElementById("hero-stats").innerHTML = "here are the speed stats:" + data.results[0].powerstats.speed;
    
    
    })

};

function loadGifs(){
  let input = document.getElementById('searchInput').value
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

