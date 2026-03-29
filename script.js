
mapboxgl.accessToken = 'pk.eyJ1IjoiY29ldGhhbiIsImEiOiJjbW04Mm9vNTAwem5hMnFwbXA3bm9sYzg1In0.FUDLFtuUAAp3eF1BSszV6g'; //****ADD YOUR PUBLIC ACCESS TOKEN*****


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/coethan/cmn81g1u7002401s6dxjdhgnr',
    center: [-79.39, 43.65],
    zoom: 11
});



map.on('load', () => {

    map.addSource('wf-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Parks%20Drinking%20Fountains%20-%204326.geojson'
    });
    map.addLayer({
        'id': 'wf-point',
        'type': 'circle',
        'source': 'wf-data',
        'paint': {
            'circle-radius': 7,
            'circle-color': '#1975e1'
        }
    });
    map.addSource('city-data', {
        'type': 'vector',
        'url': 'mapbox://styles/coethan/cmn81g1u7002401s6dxjdhgnr'
    });
    map.addLayer({
        'id': 'city points',
        'type': 'circle',
        'source': 'city-data',
        'paint': {
            'circle-color': '#3810c8ff',
            'circle-radius': 5,
        },
        'source-layer': 'GGR472 Project Map'
    },
        'wf-point');
});

map.on('load', () => {

    map.addSource('toronto-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/main/Data%20from%20geojson.io/cycling-network%20-%204326-2.geojson'
    });
    map.addLayer({
        'id': 'toronto-line',
        'type': 'line',
        'source': 'toronto-data',
        'paint': {
            'line-length': 7,
            'line-color': '#000000ff'
        }
    });
    map.addSource('city-data', {
        'type': 'vector',
        'url': 'mapbox://styles/coethan/cmn81g1u7002401s6dxjdhgnr'
    });
    map.addLayer({
        'id': 'city points',
        'type': 'circle',
        'source': 'city-data',
        'paint': {
            'circle-color': '#3810c8ff',
            'circle-radius': 5,
        },
        'source-layer': 'GGR472 Project Map'
    },
        'toronto-point');
});

map.on('load', () => {

    map.addSource('bpr-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Bicycle%20Parking%20Racks%20Data%20-%204326.geojson'
    });
    map.addLayer({
        'id': 'bpr-point',
        'type': 'circle',
        'source': 'bpr-data',
        'paint': {
            'circle-radius': 7,
            'circle-color': '#BA8312'
        }
    });
    map.addSource('city-data', {
        'type': 'vector',
        'url': 'mapbox://styles/coethan/cmn81g1u7002401s6dxjdhgnr'
    });
    map.addLayer({
        'id': 'city points',
        'type': 'circle',
        'source': 'city-data',
        'paint': {
            'circle-color': '#3810c8ff',
            'circle-radius': 5,
        },
        'source-layer': 'GGR472 Project Map'
    },
        'bpr-point');
});

map.on('load', () => {

    map.addSource('wr-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Washroom%20Facilities%20-%204326-3.geojson'
    });
    map.addLayer({
        'id': 'wr-point',
        'type': 'circle',
        'source': 'wr-data',
        'paint': {
            'circle-radius': 7,
            'circle-color': '#9A4DFF'
        }
    });
    map.addSource('city-data', {
        'type': 'vector',
        'url': 'mapbox://styles/coethan/cmn81g1u7002401s6dxjdhgnr'
    });
    map.addLayer({
        'id': 'city points',
        'type': 'circle',
        'source': 'city-data',
        'paint': {
            'circle-color': '#3810c8ff',
            'circle-radius': 5,
        },
        'source-layer': 'GGR472 Project Map'
    },
        'wr-point');
});

map.on('load', () => {

    map.addSource('park-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Parks%20and%20Recreation%20Facilities%20-%204326.geojson'
    });
    map.addLayer({
        'id': 'park-point',
        'type': 'circle',
        'source': 'park-data',
        'paint': {
            'circle-radius': 7,
            'circle-color': '#C02C82'
        }
    });
    map.addSource('city-data', {
        'type': 'vector',
        'url': 'mapbox://styles/coethan/cmn81g1u7002401s6dxjdhgnr'
    });
    map.addLayer({
        'id': 'city points',
        'type': 'circle',
        'source': 'city-data',
        'paint': {
            'circle-color': '#3810c8ff',
            'circle-radius': 5,
        },
        'source-layer': 'GGR472 Project Map'
    },
        'park-point');
});
