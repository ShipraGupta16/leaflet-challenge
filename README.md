# leaflet-challenge

### Introduction

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, we develop a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

Tech stack: HTML, JavaScript

### Deployment link: 
https://shipragupta16.github.io/leaflet-challenge/


### Instructions
The instructions for this activity are broken into two parts:

### Part 1: Create the Earthquake Visualization

The first task is to visualize an earthquake dataset. Complete the following steps:

1) Get your dataset. To do so, Follow these steps:

	The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed to an external site. page and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link: http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

	When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The image comes out is a sampling of earthquake data in JSON format.

2) Import and visualize the data by doing the following:

	Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

	Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color. Hint: The depth of the earth can be found as the third 	coordinate for each earthquake.

	Include popups that provide additional information about the earthquake when its associated marker is clicked. Create a legend that will provide context for your map data.

![Screenshot 2023-09-19 at 10 50 55 PM](https://github.com/ShipraGupta16/leaflet-challenge/assets/25715747/e620f25b-dfdc-449a-8932-fa11d469bc16)


### Part 2: Gather and Plot More Data

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates

Perform the following tasks:

a) Plot the tectonic plates dataset on the map in addition to the earthquakes.

b) Add other base maps to choose from.

c) Put each dataset into separate overlays that can be turned on and off independently.

d) Add layer controls to your map.


![Screenshot 2023-09-19 at 10 51 22 PM](https://github.com/ShipraGupta16/leaflet-challenge/assets/25715747/2f6b4c0f-e4f6-4c81-aa92-fc1a8a0c7b31)


