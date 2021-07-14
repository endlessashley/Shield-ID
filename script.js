(function () {
    function giphySearch(keyword) {
      return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=XnUlKSQw33KcHiZVIv8ReqDGr7nJZwCS&limit=3`)
        .then(response => response.json());
      
  
      }
     function infoSearch(keyword) {
       return fetch('https://superheroapi.com/api/4431251130239326/search/' + keyword)
     } 

    function appendImage(img) {
      let $div = $('<div class="img-wrapper"></div>');
      $('<div class="inner"></div>').append(img).appendTo($div);
      $('.gifs').append($div)
    }
   

    function onImgLoad(img) {
      return new Promise((resolve, reject) => {
        img.onload = resolve;
      });
    }
  
    (function listenOnFormSubmit() {
      $('.pure-form').submit(async (ev) => {
        ev.preventDefault();
  
        let $input = $('#searchInput');
  
        main($input.val());
      });
    })();
  
    async function main(keyword) {
      const result = await giphySearch(keyword);
      $('.gifs').html('');

      let promises = [];
      result.data.forEach(gif => {
        let img = new Image();
        img.src = gif.images.original.url;
        promises.push(onImgLoad(img));

        appendImage(img);
      });
  
      await Promise.all(promises);
    }
  })();


var heroAPI = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4431251130239326/search/";

document.getElementById("submitBtn").onclick = function(event) {
    event.preventDefault();
    loadJSONFile()};

    function loadJSONFile() {       
      let input = document.getElementById('search').value
      console.log(input)
      console.log("step 1 done.")

      var searchURL = heroAPI + input;
      console.log(searchURL);
      fetch(searchURL)
          .then(function (response) {
              return  response.json();
          })
          .then(function (data) {
               console.log(data);
               console.log(data.results[0].name);
               console.log(data.results[0].id);
               document.getElementById("hero-name").innerHTML = data.results[0].name;
              //  document.getElementById("full-name").innerHTML = data.results[0].biography.full-name;
              //  document.getElementById("alter-egos").innerHTML = data.results[0].biography.alter-egos;


               console.log(data.results[0].image.url);
               document.getElementById("thumbnail").innerHTML.src = data.results[0].image.url;
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

              });     
              
              // console.log("step 2 done.");
              
              console.log("step 3 done.");
              }