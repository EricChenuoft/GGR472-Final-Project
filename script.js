mapboxgl.accessToken = 'pk.eyJ1IjoiY29ldGhhbiIsImEiOiJjbW04Mm9vNTAwem5hMnFwbXA3bm9sYzg1In0.FUDLFtuUAAp3eF1BSszV6g'; 


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
            'circle-radius': 5,
            'circle-color': '#1975e1'
        }
    });

    map.on('mouseenter', 'wf-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'wf-point', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'wf-point', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<b>Water Fountain</b> " + "<br>" +
                "<b>Address:</b> " + e.features[0].properties.address + "<br>")
            .addTo(map);
    })
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
            'line-length': 5,
            'line-color': '#000000ff'
        }
    });
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
            'circle-radius': 5,
            'circle-color': '#BA8312'
        }
    });

    map.on('mouseenter', 'bpr-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'bpr-point', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'bpr-point', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<b>Bike Parking Rack</b> " + "<br>")
            .addTo(map);
    })
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
            'circle-radius': 5,
            'circle-color': '#9A4DFF'
        }
    });

    map.on('mouseenter', 'wr-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'wr-point', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'wr-point', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<b>Washroom</b> " + "<br>" +
                "<b>Address:</b> " + e.features[0].properties.address + "<br>")
            .addTo(map);
    })
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
            'circle-radius': 5,
            'circle-color': '#C02C82'
        }
    });

    map.on('mouseenter', 'park-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'park-point', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'park-point', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<b>Parks and Recreation</b> " + "<br>")
            .addTo(map);
    })
});

