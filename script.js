mapboxgl.accessToken = 'pk.eyJ1IjoiY29ldGhhbiIsImEiOiJjbW04Mm9vNTAwem5hMnFwbXA3bm9sYzg1In0.FUDLFtuUAAp3eF1BSszV6g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-79.39, 43.65],
    zoom: 11
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.on('load', () => {

    map.addSource('wf-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Parks%20Drinking%20Fountains%20-%204326.geojson'
    });
    map.addLayer({
        'id': 'wf-point',
        'type': 'circle',
        'source': 'wf-data',
        'layout': { 'visibility': 'visible'

        },
        'paint': {
            'circle-radius': 5,
            'circle-color': '#1975e1'
        }
    });

    map.addLayer({
        'id': 'wf-labels',
        'type': 'symbol',
        'source': 'wf-data',
        'layout': {
            'text-field': ['get', 'name'],
            'text-variable-anchor': ['bottom'], // Places the name of the location underneath the point
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'visibility': 'visible'
        },
        'paint': {
            'text-color': 'blue' // Makes the text colour red
        },
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
    });

    map.addSource('toronto-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/main/Data%20from%20geojson.io/cycling-network%20-%204326-2.geojson'
    });

    map.addLayer({
        'id': 'toronto-line',
        'type': 'line',
        'source': 'toronto-data',
        'layout': { 'visibility': 'visible'

        },
        'paint': {
            'line-width': 2,
            'line-color': 'rgb(25, 145, 29)'
        },
    });

    map.addLayer({
        'id': 'toronto-labels',
        'type': 'symbol',
        'source': 'toronto-data',
        'layout': {
            'text-field': ['get', 'name'],
            'text-variable-anchor': ['bottom'], // Places the name of the location underneath the point
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'visibility': 'visible'

        },
        'paint': {
            'text-color': 'black' // Makes the text colour red
        },
    });

    map.addSource('bpr-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Bicycle%20Parking%20Racks%20Data%20-%204326.geojson'
    });

    map.addLayer({
        'id': 'bpr-point',
        'type': 'circle',
        'source': 'bpr-data',
        'layout': { 'visibility': 'visible'

        },
        'paint': {
            'circle-radius': 5,
            'circle-color': '#BA8312'
        }
    });

    map.addLayer({
        'id': 'bpr-labels',
        'type': 'symbol',
        'source': 'bpr-data',
        'layout': {
            'text-field': ['get', 'name'],
            'text-variable-anchor': ['bottom'], // Places the name of the location underneath the point
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'visibility': 'visible'
        },
        'paint': {
            'text-color': 'brown' // Makes the text colour red
        },
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
    });

    map.addSource('wr-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Washroom%20Facilities%20-%204326-3.geojson'
    });

    map.addLayer({
        'id': 'wr-point',
        'type': 'circle',
        'source': 'wr-data',
        'layout': { 'visibility': 'visible'

        },
        'paint': {
            'circle-radius': 5,
            'circle-color': '#9A4DFF'
        }
    });

    map.addLayer({
        'id': 'wr-labels',
        'type': 'symbol',
        'source': 'wr-data',
        'layout': {
            'text-field': ['get', 'name'],
            'text-variable-anchor': ['bottom'], // Places the name of the location underneath the point
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'visibility': 'visible'
        },
        'paint': {
            'text-color': 'purple' // Makes the text colour red
        },
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
    });

    map.addSource('park-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Parks%20and%20Recreation%20Facilities%20-%204326.geojson'
    });

    map.addLayer({
        'id': 'park-point',
        'type': 'circle',
        'source': 'park-data',
        'layout': { 'visibility': 'visible'

        },
        'paint': {
            'circle-radius': 5,
            'circle-color': '#C02C82'
        }
    });

    map.addLayer({
        'id': 'park-labels',
        'type': 'symbol',
        'source': 'park-data',
        'layout': {
            'text-field': ['get', 'name'],
            'text-variable-anchor': ['bottom'], // Places the name of the location underneath the point
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'visibility': 'visible'
        },
        'paint': {
            'text-color': 'pink' // Makes the text colour red
        },
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
    });

    document.getElementById('returnbutton').addEventListener('click', () => {
        map.flyTo({
            center: [-79.39, 43.65],
            zoom: 11,
            essential: true
        });
    });

    // Chooses what to put on the legend, and what colour represents it
    const legenditems = [
        { label: 'Parks and Recreational Facilities', colour: '#C02C82' },
        { label: 'water fountains', colour: '#1975e1' },
        { label: 'Bike Racks', colour: '#BA8312' },
        { label: 'Washrooms', colour: '#9A4DFF' },
        { label: 'Bike Routes', colour: 'rgb(25, 145, 29)' },
    ];


    // For each array item create a row to put the label and colour in
    legenditems.forEach(({ label, colour }) => {
        const row = document.createElement('div'); // each item gets a 'row' as a div - this isn't in the legend yet, we do this later
        const colcircle = document.createElement('span'); // create span for colour circle

        colcircle.className = 'legend-colcircle'; // the colcircle will take on the shape and style properties defined in css
        colcircle.style.setProperty('--legendcolour', colour); // a custom property is used to take the colour from the array and apply it to the css class

        const text = document.createElement('span'); // create span for label text
        text.textContent = label; // set text variable to tlegend label value in array

        row.append(colcircle, text); // add circle and text to legend row
        legend.appendChild(row); // add row to legend container
    });

    // Chooses whether to display the legend or not but using a check box 
    let legendcheck = document.getElementById('legendcheck');

    legendcheck.addEventListener('click', () => {
        if (legendcheck.checked) {
            legendcheck.checked = true;
            legend.style.display = 'block';
        }
        else {
            legend.style.display = "none";
            legendcheck.checked = false;
        }
    });
});

map.on('idle', () => {
        // If these two layers were not added to the map, abort
        if (!map.getLayer('wf-point') || !map.getLayer('wr-point') || !map.getLayer('bpr-point')|| !map.getLayer('park-point')|| !map.getLayer('toronto-line')) {
            return;
        }

        // Enumerate ids of the layers.
        const toggleableLayerIds = ['wf-point', 'wr-point', 'bpr-point', 'park-point','toronto-line'];

        // Set up the corresponding toggle button for each layer.
        for (const id of toggleableLayerIds) {
            // Skip layers that already have a button set up.
            if (document.getElementById(id)) {
                continue;
            }

            // Create a link.
            const link = document.createElement('a');
            link.id = id;
            link.href = '#';
            link.textContent = id;
            link.className = 'active';

            // Show or hide layer when the toggle is clicked.
            link.onclick = function (e) {
                const clickedLayer = this.textContent;
                e.preventDefault();
                e.stopPropagation();

                const visibility = map.getLayoutProperty(
                    clickedLayer,
                    'visibility'
                );

                // Toggle layer visibility by changing the layout object's visibility property.
                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    this.className = '';
                } else {
                    this.className = 'active';
                    map.setLayoutProperty(
                        clickedLayer,
                        'visibility',
                        'visible'
                    );
                }
            };

            const layers = document.getElementById('menu');
            layers.appendChild(link);
        }
    });


// map.on('load', () => {

//     map.addSource('wf-data', {
//         type: 'geojson',
//         data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Parks%20Drinking%20Fountains%20-%204326.geojson'
//     });
//     map.addLayer({
//         'id': 'wf-point',
//         'type': 'circle',
//         'source': 'wf-data',
//         'paint': {
//             'circle-radius': 5,
//             'circle-color': '#1975e1'
//         }
//     });

//     map.on('mouseenter', 'wf-point', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });

//     map.on('mouseleave', 'wf-point', () => {
//         map.getCanvas().style.cursor = '';
//     });

//     map.on('click', 'wf-point', (e) => {
//         new mapboxgl.Popup()
//             .setLngLat(e.lngLat)
//             .setHTML("<b>Water Fountain</b> " + "<br>" +
//                 "<b>Address:</b> " + e.features[0].properties.address + "<br>")
//             .addTo(map);
//     });
// });

// map.on('load', () => {

//     map.addSource('toronto-data', {
//         type: 'geojson',
//         data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/main/Data%20from%20geojson.io/cycling-network%20-%204326-2.geojson'
//     });
//     map.addLayer({
//         'id': 'toronto-line',
//         'type': 'line',
//         'source': 'toronto-data',
//         'paint': {
//             'line-length': 5,
//             'line-color': '#000000ff'
//         }
//     });
// });

// map.on('load', () => {

//     map.addSource('bpr-data', {
//         type: 'geojson',
//         data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Bicycle%20Parking%20Racks%20Data%20-%204326.geojson'
//     });
//     map.addLayer({
//         'id': 'bpr-point',
//         'type': 'circle',
//         'source': 'bpr-data',
//         'paint': {
//             'circle-radius': 5,
//             'circle-color': '#BA8312'
//         }
//     });

//     map.on('mouseenter', 'bpr-point', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });

//     map.on('mouseleave', 'bpr-point', () => {
//         map.getCanvas().style.cursor = '';
//     });

//     map.on('click', 'bpr-point', (e) => {
//         new mapboxgl.Popup()
//             .setLngLat(e.lngLat)
//             .setHTML("<b>Bike Parking Rack</b> " + "<br>")
//             .addTo(map);
//     })
// });

// map.on('load', () => {

//     map.addSource('wr-data', {
//         type: 'geojson',
//         data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Washroom%20Facilities%20-%204326-3.geojson'
//     });
//     map.addLayer({
//         'id': 'wr-point',
//         'type': 'circle',
//         'source': 'wr-data',
//         'paint': {
//             'circle-radius': 5,
//             'circle-color': '#9A4DFF'
//         }
//     });

//     map.on('mouseenter', 'wr-point', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });

//     map.on('mouseleave', 'wr-point', () => {
//         map.getCanvas().style.cursor = '';
//     });

//     map.on('click', 'wr-point', (e) => {
//         new mapboxgl.Popup()
//             .setLngLat(e.lngLat)
//             .setHTML("<b>Washroom</b> " + "<br>" +
//                 "<b>Address:</b> " + e.features[0].properties.address + "<br>")
//             .addTo(map);
//     })
// });

// map.on('load', () => {

//     map.addSource('park-data', {
//         type: 'geojson',
//         data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Parks%20and%20Recreation%20Facilities%20-%204326.geojson'
//     });
//     map.addLayer({
//         'id': 'park-point',
//         'type': 'circle',
//         'source': 'park-data',
//         'paint': {
//             'circle-radius': 5,
//             'circle-color': '#C02C82'
//         }
//     });

//     map.on('mouseenter', 'park-point', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });

//     map.on('mouseleave', 'park-point', () => {
//         map.getCanvas().style.cursor = '';
//     });

//     map.on('click', 'park-point', (e) => {
//         new mapboxgl.Popup()
//             .setLngLat(e.lngLat)
//             .setHTML("<b>Parks and Recreation</b> " + "<br>")
//             .addTo(map);
//     })
// });


