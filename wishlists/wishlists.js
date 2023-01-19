async function createWishlist() {  
    const wishlistInput = document.getElementById("wishlist-items").value.trim();  
    if (USERNAME && SELECTED_sTORE_ID && wishlistInput) {  
        addWishlist(USERNAME, wishlistInput.split(","), STORE);  
    }  
}

export async function displayNearbyWishlists(latitude, longitude) {
    try {
        const nearbyWishlists = await fetchNearbyWishlists(latitude, longitude);
        renderWishlists('nearby-wishlists', nearbyWishlists);
    } catch (error) {
        console.error(error);
    }
}

export async function displayMyRequests(latitude, longitude) {  
    try {  
        const myWishlists = await fetchNearbyWishlists(latitude, longitude, {buyer: USERNAME});  
        renderWishlists('my-wishlists', myWishlists);  
    } catch(error) {  
        console.error(error);  
    }  
}

export async function displayMyTrips(latitude, longitude) {  
    try {  
        const myTrips = await fetchNearbyWishlists(latitude, longitude, {wishmaster: USERNAME});  
        renderWishlists('my-trips', myTrips);  
    } catch(error) {  
        console.error(error);  
    }  
}

export async function updateWishlistStatus(event) {  
    switch(event.target.className) {  
        case 'accept':  
            event.preventDefault();  
            updateWishlist(  
                event.target.getAttribute('data-id'),  
                {  
                    status: 'ACCEPTED',  
                    wishmaster: USERNAME  
                }  
            ).then((result) => {  
                updateWishlistNode(event.target, 'ACCEPTED');  
            }).catch(error => console.error(error));
            
            break;  
        case 'accepted':  
            event.preventDefault();  
            updateWishlist(  
                event.target.getAttribute('data-id'),  
                {  
                    status: 'FULFILLED',  
                    wishmaster: USERNAME  
                }  
            ).then((result) => {  
                updateWishlistNode(event.target, 'FULFILLED');  
            }).catch(error => console.error(error));
            
            break;  
    }  
}