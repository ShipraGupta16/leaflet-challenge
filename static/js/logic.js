// Util function to display colors based on earth quake magnitude
function chooseColor(depth) {
    switch(true) {
        case (depth <= 10):
          return "#0071BC";
        case (depth <= 30):
          return "#35BC00";
        case (depth <= 50):
          return "#FFC300";
        case (depth <= 70):
          return "#FF5733";
        case (depth <= 90):
          return "#C70039";
        default:
          return "#581845";
    }
  }

// Popup message when user clicks on circle marker
function onEveryFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.title}</h3><hr><h4>User Location: ${feature.properties.place}</h4><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Earthquake Magnitude & Depth: ${feature.properties.mag} & ${feature.geometry.coordinates[2]} </p>`);
  }
  
  // Circle marker based on earth quake maginatude
  function createMarker(feature, latlng) {
    let circleMarkers = {
      radius: feature.properties.mag * 30000,
      fillColor: chooseColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.8,
      color: chooseColor(feature.geometry.coordinates[2]),
      weight: 0.75
    }
    return L.circle(latlng, circleMarkers);
  }

// Feature Method that constructs the Map's popup details with Markers and triggers createMap method
function constructFeatureWithInput(all7DayEQData) {  
    let earthquakes = L.geoJSON(all7DayEQData, {
      onEachFeature: onEveryFeature,
      pointToLayer: createMarker
    });
  
    // Send our earthquakes layer to the createMap function
    createMap(earthquakes);
}  