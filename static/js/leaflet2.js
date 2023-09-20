// Store our API endpoint as queryUrl and tectonicplatesUrl
let earthQuakeAPI = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicplatesAPI = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// API call to retrieve earthQuake data
d3.json(earthQuakeAPI).then(function (data) {
    console.log(data);
    constructFeatureWithInput(data.features);
});


// Creates map using the mapbox and openstreetmap
function createMap(earthquakes) {

    // Create tile layers -> satellite view
    let satelliteMap = L.tileLayer('https://api.mapbox.com/styles/v1/{style}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        style: 'mapbox/satellite-v9',
        accessToken: 'pk.eyJ1Ijoic2hpcHJhMTYiLCJhIjoiY2xtcHl4b2hlMGczcjJqcXNvMTFoYXlkYyJ9.ADJx5M64Dype-OyzRTr59A'
    });

    // light-v11 view (greyscale)
    let grayscaleMap = L.tileLayer('https://api.mapbox.com/styles/v1/{style}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        style: 'mapbox/light-v11',
        accessToken: 'pk.eyJ1Ijoic2hpcHJhMTYiLCJhIjoiY2xtcHl4b2hlMGczcjJqcXNvMTFoYXlkYyJ9.ADJx5M64Dype-OyzRTr59A'
    });

    //outdoors view (outdoorsMap)
    let outdoorsMap = L.tileLayer('https://api.mapbox.com/styles/v1/{style}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        style: 'mapbox/outdoors-v12',
        accessToken: 'pk.eyJ1Ijoic2hpcHJhMTYiLCJhIjoiY2xtcHl4b2hlMGczcjJqcXNvMTFoYXlkYyJ9.ADJx5M64Dype-OyzRTr59A'
    });

    // Create layer for tectonic plates
    tectonicPlates = new L.layerGroup();

    // Perform a GET request to the tectonicplatesAPI data
    d3.json(tectonicplatesAPI).then(function (plates) {
        // Console log the data retrieved for plates
        console.log(plates);
        L.geoJSON(plates, {
        color: "orange",
        weight: 2
        }).addTo(tectonicPlates);
    });

    // Create a baseMaps object.
    let baseMaps = {
        "Satellite": satelliteMap,
        "Grayscale": grayscaleMap,
        "Outdoors": outdoorsMap
    };

    // Create an overlay object to hold our overlay.
    let overlayMaps = {
        "Earthquakes": earthquakes,
        "Tectonic Plates": tectonicPlates
    };
    // Create our map, giving it the satellite map and earthquakes layers to display on load.
    let myMap = L.map("map", {
        center: [
        37.09, -95.71
        ],
        zoom: 4,
        layers: [satelliteMap, earthquakes, tectonicPlates]
    });

    // Add legend
    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend"),
        depth = [-10, 10, 30, 50, 70, 90];

        div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

        for (let i = 0; i < depth.length; i++) {
            div.innerHTML +=
            '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap)

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);
};