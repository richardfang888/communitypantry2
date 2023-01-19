export function setStoreNavigation(map, storesGeoJson) {  
    const wishlistElements = document.getElementsByClassName('wishlist');
    
    for (let i=0; i<wishlistElements.length; i++) {  
        wishlistElements[i].onclick = (event) => {  
            const storeId = event.currentTarget.getAttribute('data-store-id');
            
            for (let point of storesGeoJson.features) {  
                if (storeId === point.properties.id) {  
                    flyToStore(map, point);  
                    displayStoreDetails(map, point);  
                    updateSelectedStore(storeId);  
                    break;  
                }  
            }  
        }  
    }  
}

export function flyToStore(map, point) {  
    map.flyTo({  
        center: point.geometry.coordinates,  
        zoom: 20  
    });  
}