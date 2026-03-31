mapboxgl.accessToken = 'pk.eyJ1IjoiY29ldGhhbiIsImEiOiJjbW04Mm9vNTAwem5hMnFwbXA3bm9sYzg1In0.FUDLFtuUAAp3eF1BSszV6g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-79.39, 43.65],
    zoom: 11
});

map.addControl(new mapboxgl.FullscreenControl());

// pixels the map pans when the up or down arrow is clicked
const deltaDistance = 100;

// degrees the map rotates when the left or right arrow is clicked
const deltaDegrees = 25;

function easing(t) {
    return t * (2 - t);
}

const distanceContainer = document.getElementById('distance');

// GeoJSON object to hold our measurement features
const geojson = {
    'type': 'FeatureCollection',
    'features': []
};

// Used to draw a line between points
const linestring = {
    'type': 'Feature',
    'geometry': {
        'type': 'LineString',
        'coordinates': []
    }
};

map.on('load', () => {
    //A button function that clears the distance line found on mapbox website
    document.getElementById('clear-btn').addEventListener('click', () => {
    // Clear all features
    geojson.features = [];
    // Clear the linestring coordinates
    linestring.geometry.coordinates = [];
    // Clear the distance display
    distanceContainer.innerHTML = '';
    // Update the map source
    map.getSource('geojson').setData(geojson);
});
    map.getCanvas().focus();
    map.getCanvas().parentNode.classList.remove('mapboxgl-interactive');

    map.getCanvas().addEventListener(
        'keydown',
        (e) => {
            e.preventDefault();
            if (e.which === 38) {
                // up
                map.panBy([0, -deltaDistance], {
                    easing: easing
                });
            } else if (e.which === 40) {
                // down
                map.panBy([0, deltaDistance], {
                    easing: easing
                });
            } else if (e.which === 37) {
                // left
                map.easeTo({
                    bearing: map.getBearing() - deltaDegrees,
                    easing: easing
                });
            } else if (e.which === 39) {
                // right
                map.easeTo({
                    bearing: map.getBearing() + deltaDegrees,
                    easing: easing
                });
            }
        },
        true
    );
    map.addSource('geojson', {
        'type': 'geojson',
        'data': geojson
    });

    // Add styles to the map
    map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
            'circle-radius': 5,
            'circle-color': '#000'
        },
        filter: ['in', '$type', 'Point']
    });
    map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            'line-color': '#000',
            'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
    });
    map.addSource('wf-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/EricChenuoft/GGR472-Final-Project/refs/heads/main/Data%20from%20geojson.io/Parks%20Drinking%20Fountains%20-%204326.geojson'
    });
    map.addLayer({
        'id': 'wf-point',
        'type': 'circle',
        'source': 'wf-data',
        'layout': {
            'visibility': 'visible'

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
        'layout': {
            'visibility': 'visible'

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
        'layout': {
            'visibility': 'visible'

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
        'layout': {
            'visibility': 'visible'

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
        'layout': {
            'visibility': 'visible'

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
    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );
});

map.on('idle', () => {
    // If these two layers were not added to the map, abort
    if (!map.getLayer('wf-point') || !map.getLayer('wr-point') || !map.getLayer('bpr-point') || !map.getLayer('park-point') || !map.getLayer('toronto-line')) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['wf-point', 'wr-point', 'bpr-point', 'park-point', 'toronto-line'];

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
    map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['measure-points']
        });

        // Remove the linestring from the group
        // so we can redraw it based on the points collection.
        if (geojson.features.length > 1) geojson.features.pop();

        // Clear the distance container to populate it with a new value.
        distanceContainer.innerHTML = '';

        // If a feature was clicked, remove it from the map.
        if (features.length) {
            const id = features[0].properties.id;
            geojson.features = geojson.features.filter(
                (point) => point.properties.id !== id
            );
        } else {
            const point = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [e.lngLat.lng, e.lngLat.lat]
                },
                'properties': {
                    'id': String(new Date().getTime())
                }
            };

            geojson.features.push(point);
        }

        if (geojson.features.length > 1) {
            linestring.geometry.coordinates = geojson.features.map(
                (point) => point.geometry.coordinates
            );

            geojson.features.push(linestring);

            // Populate the distanceContainer with total distance
            const value = document.createElement('pre');
            const distance = turf.length(linestring);
            value.textContent = `Total distance: ${distance.toLocaleString()}km`;
            distanceContainer.appendChild(value);
        }

        map.getSource('geojson').setData(geojson);
    });
});

map.on('mousemove', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['measure-points']
    });
    // Change the cursor to a pointer when hovering over a point on the map.
    // Otherwise cursor is a crosshair.
    map.getCanvas().style.cursor = features.length
        ? 'pointer'
        : 'crosshair';

});

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);




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


