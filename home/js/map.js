mapboxgl.accessToken = 'your-secret-token';

const map = new mapboxgl.Map({  
    container: 'map',  
    style: 'mapbox://styles/mapbox/light-v10',  
    center: [77.645296, 12.978624],  
    zoom: 2  
});

const geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl });map.addControl(geocoder);geocoder.on("result", (data) => {  
    geocoderCallback(data);  
});

function convertToGeoJson(stores) {return {  
    type: "FeatureCollection",  
    features: stores.map(store => {  
        return {  
            type: "Feature",  
            geometry: {  
                type: 'Point',  
                coordinates: [store.longitude, store.latitude]  
            },  
            properties: {  
                id: store.id,  
                name: store.name,  
                address: store.address,  
                phone: store.phone,  
                distance: store.distance,  
                rating: store.rating,  
            }  
        }  
    })  
  }}

function plotStoresOnMap(map, storesGeoJson) {  
    for(let store of storesGeoJson.features) {  
        // create a HTML element for each feature  
        let el = document.createElement('div');  
        el.className = 'store';  
        el.title = `${store.properties.name}\n` +  
        `approximately ${store.properties.distance.toFixed(2)} km away\n` +  
        `Address: ${store.properties.address || "N/A"}\n` +  
        `Phone: ${store.properties.phone || "N/A"}\n` +  
        `Rating: ${store.properties.rating || "N/A"}`; // make a marker for each feature and add to the map  
        new mapboxgl.Marker(el)  
            .setLngLat(store.geometry.coordinates)  
            .addTo(map); el.addEventListener('click', function(e) {  
            updateSelectedStore(store.properties.id);  
        });
    }  
}

export function displayStoreDetails(map, point) {  
    const popUps = document.getElementsByClassName('mapboxgl-popup');  
    /** Check if there is already a popup on the map and if so, remove it */  
    if (popUps[0]){  
        popUps[0].remove();  
    } const popup = new mapboxgl.Popup({ closeOnClick: false })  
        .setLngLat(point.geometry.coordinates)  
        .setHTML(`  
            <details>  
                <summary><h2>${point.properties.name}</h2></summary>  
                <dl>  
                    <dt>Distance</dt>  
                    <dd>Approximately <strong>${point.properties.distance.toFixed(2)} km</strong> away</dd>
                    
                    <dt>Address</dt>  
                    <dd>${point.properties.address || 'N/A'}</dd>
                    
                    <dt>Phone</dt>  
                    <dd>${point.properties.phone || 'N/A'}</dd>
                    
                    <dt>Rating</dt>  
                    <dd>${point.properties.rating || 'N/A'}</dd>  
                </dl>  
            </details>  
        `)  
        .addTo(map);  
    return popup;  
}


map.addControl(new mapboxgl.NavigationControl());  

return map;