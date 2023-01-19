document.getElementById("add-wishlist").onclick = function(e) {  
    createWishlist();  
}

const wishlists = document.getElementsByClassName('wishlists');  
    for (let i=0; i<wishlists.length; i++) {  
        wishlists[i].addEventListener('click', updateWishlistStatus);  
    }  
