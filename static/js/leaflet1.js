const apiEndPoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Calling API endpoint
d3.json(apiEndPoint).then(data => {
    console.log("Printing data", data);
    constructFeatureWithInput(data.features);
});

// Legend Util that gets added to the map dynamically on bottom right
let legend = L.control({position: "bottomright"});
legend.onAdd = function(map) {
  let div = L.DomUtil.create('div', 'info legend'),
    grades = [-10, 10, 30, 50, 70, 90];
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
    return div;
};

// Main method that creates the map using mapbox and openstreet api's.
function createMap(earthquakes) {

    // Create tile layer
    let outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 16,
      id: "outdoors-v11",
      accessToken: 'pk.eyJ1Ijoic2hpcHJhMTYiLCJhIjoiY2xtcHl4b2hlMGczcjJqcXNvMTFoYXlkYyJ9.ADJx5M64Dype-OyzRTr59A'
    });
  
    // Create our map, giving it the grayscale map and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 4,
      layers: [outdoorsMap, earthquakes]
    });

    legend.addTo(myMap)
  };