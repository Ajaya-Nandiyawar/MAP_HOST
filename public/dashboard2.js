mapboxgl.accessToken = "pk.eyJ1IjoidGhlLWRlc3Ryb3llciIsImEiOiJjbTdkbWd1ZjIwMDJ3MmpxdXp3dWNpb3VlIn0.GtirZBfgEJOCgwsM9ZB0Zg";

// Initialize map
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v11', // Added missing style property
    center: [73.8572, 18.5207], // Pune center
    zoom: 11,
});

// Location data
const locations = [
  {
    position: { lat: 18.5912, lng: 73.89 },
    title: "Hadapsar Food Pickup",
    description: "Vegetable Curry and Rice",
    quantity: "18 containers",
    type: "red",
  },
  {
    position: { lat: 18.501, lng: 73.8835 },
    title: "Kalyani Nagar Food Pickup",
    description: "Chapati, Rice, and Vegetables",
    quantity: "20 containers",
    type: "green",
  },
  {
    position: { lat: 18.5761, lng: 73.7982 },
    title: "Pimpri Food Pickup",
    description: "Rice, Dal, and Pickles",
    quantity: "10 containers",
    type: "green",
  },
  {
    position: { lat: 18.468, lng: 73.8832 },
    title: "Aundh Food Pickup",
    description: "Vegetable Pulao and Raita",
    quantity: "14 containers",
    type: "red",
  },
  {
    position: { lat: 18.5705, lng: 73.7987 },
    title: "Bavdhan Food Pickup",
    description: "Packed Snacks and Juice",
    quantity: "12 containers",
    type: "green",
  },
  {
    position: { lat: 18.5207, lng: 73.8572 },
    title: "FC Road Food Pickup",
    description: "Sandwiches and Water Bottles",
    quantity: "9 containers",
    type: "red",
  },
  {
    position: { lat: 18.5231, lng: 73.8625 },
    title: "JM Road Food Pickup",
    description: "Chapati, Rice, and Vegetable Curry",
    quantity: "15 containers",
    type: "green",
  },
  {
    position: { lat: 18.5424, lng: 73.8728 },
    title: "Koregaon Park Food Pickup",
    description: "Biriyani and Salad",
    quantity: "16 containers",
    type: "red",
  },
  {
    position: { lat: 18.5958, lng: 73.8873 },
    title: "Magarpatta Food Pickup",
    description: "Pasta and Garlic Bread",
    quantity: "11 containers",
    type: "green",
  },
  {
    position: { lat: 18.4629, lng: 73.8524 },
    title: "Viman Nagar Food Pickup",
    description: "Dosa, Sambhar, and Coconut Chutney",
    quantity: "13 containers",
    type: "red",
  },
  {
    position: { lat: 18.5532, lng: 73.8967 },
    title: "Pune Camp Food Pickup",
    description: "Cooked Meals - Rice and Dal",
    quantity: "17 containers",
    type: "green",
  },
  {
    position: { lat: 18.456, lng: 73.8082 },
    title: "Narhe Food Pickup",
    description: "Chapati, Sabzi, and Rice",
    quantity: "10 containers",
    type: "green",
  },
  {
    position: { lat: 18.5345, lng: 73.8809 },
    title: "Shivaji Nagar Food Pickup",
    description: "Vegetable Pulao and Raita",
    quantity: "22 containers",
    type: "red",
  },
  {
    position: { lat: 18.576, lng: 73.8483 },
    title: "Hadapsar Food Pickup",
    description: "Rice, Sabzi, and Buttermilk",
    quantity: "19 containers",
    type: "green",
  },
  {
    position: { lat: 18.5366, lng: 73.8474 },
    title: "Kothrud Food Pickup",
    description: "Cooked Meals - Biryani and Aloo Gobi",
    quantity: "14 containers",
    type: "red",
  },
  {
    position: { lat: 18.5557, lng: 73.8191 },
    title: "Wakad Food Pickup",
    description: "Rice, Dal, and Papad",
    quantity: "13 containers",
    type: "green",
  },
  {
    position: { lat: 18.4923, lng: 73.9127 },
    title: "Kharadi Food Pickup",
    description: "Chole Bhature and Raita",
    quantity: "8 containers",
    type: "red",
  },
  {
    position: { lat: 18.4572, lng: 73.8189 },
    title: "Dapodi Food Pickup",
    description: "Pasta, Salad, and Ice Cream",
    quantity: "11 containers",
    type: "green",
  },
  {
    position: { lat: 18.5308, lng: 73.808 },
    title: "Kothrud Food Pickup",
    description: "Veg Sandwiches and Fruit Juices",
    quantity: "17 containers",
    type: "red",
  },
  ];

let markers = []; // Array to store marker references

function addMarkers(locations) {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers = [];

    locations.forEach(location => {
        const el = document.createElement('div');
        el.className = location.type === 'red' ? 'marker-pickup' : 'marker-delivery';

        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
                <h3>${location.title}</h3>
                <p>${location.description}</p>
                <p>Quantity: ${location.quantity}</p>
                <p>Type: ${location.type === 'red' ? 'Pickup Point' : 'Delivery Point'}</p>
            `);

        // Create and store marker reference
        const marker = new mapboxgl.Marker(el)
            .setLngLat([location.position.lng, location.position.lat])
            .setPopup(popup)
            .addTo(map);

        // Store marker type for filtering
        marker.type = location.type;
        markers.push(marker);
    });

    updateActivePoints();
}

function updateActivePoints() {
    const activePointsElement = document.getElementById('activePoints');
    if (activePointsElement) {
        const visibleMarkers = markers.filter(marker => 
            !marker.getElement().style.display || 
            marker.getElement().style.display !== 'none'
        );
        activePointsElement.textContent = visibleMarkers.length;
    }
}

function filterMarkers(type, show) {
    markers.forEach(marker => {
        if (marker.type === type) {
            marker.getElement().style.display = show ? 'block' : 'none';
        }
    });
    updateActivePoints();
}

// Wait for map to load before adding markers and controls
map.on('load', () => {
    // Add markers
    addMarkers(locations);

    // Add navigation control to the map
    map.addControl(new mapboxgl.NavigationControl());

    // Add geocoder for searching places
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: 'Search for a location', // Added placeholder text
        countries: 'IN', // Limit search to India
        bbox: [73.7, 18.4, 74.0, 18.7] // Limit search to Pune region
    });

    map.addControl(geocoder, "top-left");

    // Handle geocoder result
    geocoder.on("result", (e) => {
        const { result } = e;
        const { center } = result;

        // Add a custom marker for the searched place
        const marker = new mapboxgl.Marker()
            .setLngLat(center)
            .setPopup(
                new mapboxgl.Popup().setHTML(
                    `<div class="marker-info"><h3>${result.place_name}</h3></div>`
                )
            )
            .addTo(map);

        // Fly to the searched location
        map.flyTo({ center, zoom: 14 });
    });
});

// Function to populate the dropdown lists
function populateDropdowns(locations) {
    const startPointSelect = document.getElementById('startPoint');
    const endPointSelect = document.getElementById('endPoint');
    
    if (!startPointSelect || !endPointSelect) {
        console.warn('Dropdown elements not found in the DOM');
        return;
    }
    
    // Clear existing options
    startPointSelect.innerHTML = '<option value="">Select starting point</option>';
    endPointSelect.innerHTML = '<option value="">Select destination</option>';
    
    // Add locations to both dropdowns
    locations.forEach(location => {
        const startOption = document.createElement('option');
        const endOption = document.createElement('option');
        
        const coordinates = {
            lng: location.position.lng,
            lat: location.position.lat
        };
        
        startOption.value = JSON.stringify(coordinates);
        startOption.textContent = location.title;
        
        endOption.value = JSON.stringify(coordinates);
        endOption.textContent = location.title;
        
        startPointSelect.appendChild(startOption.cloneNode(true));
        endPointSelect.appendChild(endOption);
    });
}

// Initialize dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns(locations);
});

let currentRoute = null;
let directionsControl = null;

function calculateRoute() {
    const startPoint = JSON.parse(document.getElementById('startPoint').value);
    const endPoint = JSON.parse(document.getElementById('endPoint').value);

    if (!startPoint || !endPoint) {
        alert('Please select both start and end points');
        return;
    }

    // Remove existing route if any
    if (currentRoute) {
        currentRoute.remove();
    }

    // Remove existing directions control
    if (directionsControl) {
        map.removeControl(directionsControl);
    }

    // Add directions control
    directionsControl = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        alternatives: true,
        geometries: 'geojson'
    });

    map.addControl(directionsControl, 'top-right');

    // Set origin and destination
    directionsControl.setOrigin([startPoint.lng, startPoint.lat]);
    directionsControl.setDestination([endPoint.lng, endPoint.lat]);

    // Update route info when route is calculated
    directionsControl.on('route', (e) => {
        const route = e.route[0];
        document.getElementById('routeDistance').textContent = 
            `${(route.distance / 1000).toFixed(2)} km`;
        document.getElementById('routeDuration').textContent = 
            `${Math.round(route.duration / 60)} mins`;
    });
}

function optimizeRoute() {
    const startPoint = JSON.parse(document.getElementById('startPoint').value);
    if (!startPoint) {
        alert('Please select a starting point');
        return;
    }

    // Get all delivery points (green markers)
    const deliveryPoints = locations.filter(loc => loc.type === 'green');
    
    // Use turf.js to find the optimal route
    const coordinates = deliveryPoints.map(point => 
        turf.point([point.position.lng, point.position.lat])
    );
    
    const start = turf.point([startPoint.lng, startPoint.lat]);
    let optimizedRoute = [start];
    let remaining = [...coordinates];

    while (remaining.length > 0) {
        const current = optimizedRoute[optimizedRoute.length - 1];
        let nearest = turf.nearest(current, turf.featureCollection(remaining));
        optimizedRoute.push(nearest);
        remaining = remaining.filter(point => 
            point.geometry.coordinates !== nearest.geometry.coordinates
        );
    }

    // Draw the optimized route
    if (currentRoute) {
        currentRoute.remove();
    }

    const routeCoordinates = optimizedRoute.map(point => point.geometry.coordinates);
    
    map.addLayer({
        id: 'optimized-route',
        type: 'line',
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: routeCoordinates
                }
            }
        },
        paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
        }
    });

    currentRoute = {
        remove: () => {
            if (map.getLayer('optimized-route')) {
                map.removeLayer('optimized-route');
                map.removeSource('optimized-route');
            }
        }
    };

    // Fit map to show entire route
    const bounds = routeCoordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(routeCoordinates[0], routeCoordinates[0]));

    map.fitBounds(bounds, { padding: 50 });
}

function clearRoute() {
    if (currentRoute) {
        currentRoute.remove();
    }
    if (directionsControl) {
        map.removeControl(directionsControl);
        directionsControl = null;
    }
    
    document.getElementById('routeDistance').textContent = '-';
    document.getElementById('routeDuration').textContent = '-';
}