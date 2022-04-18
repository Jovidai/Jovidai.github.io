d3.csv("data/myData.csv")
  .then(function(myData) {

   // access to myData



d3.csv("data/myData.csv")
  .then(function(myData) {

   //access to myData and world

  });

  });

var csvLoader = d3.csv("data/myData.csv");
var jsonLoader = d3.json("world-alpha.json");

Promise.all([csvLoader, jsonLoader])
  .then(function(results) {

    var myData = results[0];
    var world = results[1];

  });