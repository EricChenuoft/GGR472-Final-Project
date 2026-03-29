// mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY2NoZW51b2Z0IiwiYSI6ImNta3lqNnBpajA3dXMza3B3NHV5cGF1ZjYifQ.9EhCP_XJYYpvCW9HtF3hPQ'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Base settings for my map
const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mapbox/satellite-v9',  // The mapbox style that I am using
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 11 // starting zoom level
});