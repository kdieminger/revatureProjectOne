let restaurants = [{"img":"https://i.etsystatic.com/13571447/r/il/b9f2e8/2071038622/il_570xN.2071038622_j4vn.jpg","menu":[{"name":"Richael's Coffee","price":5}],"rating":10,"chef":"Gunther","hours":[],"name":"Central Perk","type":"Coffee"},{"img":"https://corporate.mcdonalds.com/is/image//content/dam/gwscorp/nfl/newsroom/media_assets/The%20Token.png?$MEDIA_LISTING_MODAL_IMAGE$","menu":[{"name":"McDouble","price":1}],"rating":4,"chef":"Ronald","hours":[],"name":"McDonalds","type":"American"},{"img":"https://img.foodlogistics.com/files/base/acbm/fl/image/2015/08/wendys_co_logo.55d5ec69667bb.png?auto=format&fit=max&w=1200","menu":[{"name":"Fries","price":2}],"rating":3.5,"chef":"Wendy","hours":[],"name":"Wendys","type":"American"},{"img":"https://static.wikia.nocookie.net/logopedia/images/f/fd/The_Krusty_Krab_Logo.jpg/revision/latest/scale-to-width-down/200?cb=20171120181643","menu":[{"name":"Krabby Patty","price":5},{"name":"Krabby Patty with Cheese","price":6}],"rating":5,"chef":"SpongeBob","hours":[],"name":"The Krusty Krab","type":"Seafood"},{"img":"https://i.etsystatic.com/13571447/r/il/b9f2e8/2071038622/il_570xN.2071038622_j4vn.jpg","menu":[{"name":"Richael's Coffee","price":5}],"rating":10,"chef":"Gunther","hours":[],"name":"Central Perk","type":"Coffee"},{"img":"https://corporate.mcdonalds.com/is/image//content/dam/gwscorp/nfl/newsroom/media_assets/The%20Token.png?$MEDIA_LISTING_MODAL_IMAGE$","menu":[{"name":"McDouble","price":1}],"rating":4,"chef":"Ronald","hours":[],"name":"McDonalds","type":"American"},{"img":"https://img.foodlogistics.com/files/base/acbm/fl/image/2015/08/wendys_co_logo.55d5ec69667bb.png?auto=format&fit=max&w=1200","menu":[{"name":"Fries","price":2}],"rating":3.5,"chef":"Wendy","hours":[],"name":"Wendys","type":"American"},{"img":"https://static.wikia.nocookie.net/logopedia/images/f/fd/The_Krusty_Krab_Logo.jpg/revision/latest/scale-to-width-down/200?cb=20171120181643","menu":[{"name":"Krabby Patty","price":5},{"name":"Krabby Patty with Cheese","price":6}],"rating":5,"chef":"SpongeBob","hours":[],"name":"The Krusty Krab","type":"Seafood"}];
console.log(restaurants);

// window <- An object representation of (essentially) the browser
window.onload = () => { // The onload event triggers after the webpage is finished loading.
    // document <- An object representation of the DOM.
    createRestaurantList(restaurants);
}

function createRestaurantList(restaurantList){
    let section = document.getElementById('restaurants');
    let row = document.createElement('section');
    row.class = 'row';
    for(let i = 0; i < restaurantList.length; i++) {
        if(i%3 === 0) {
            section.appendChild(row);
            row = document.createElement('section');
            row.class='row border';
        }
        let div = createRestaurantElement('div', '', 'col-sm restaurant card', row);
        let img = document.createElement('img');
        img.src = restaurantList[i].img;
        img.class = 'card-img-top';
        img.style = 'height:auto;width:100%'
        div.appendChild(img);
        let card = document.createElement('div');
        card.class="card-body";
        div.appendChild(card);
        createRestaurantElement('p', restaurantList[i].name, '', card);
        createRestaurantElement('p', restaurantList[i].eta, 'deliverytime', card);
        createRestaurantElement('p', restaurantList[i].rating, 'rating', card);
        createRestaurantElement('p', restaurantList[i].type, 'foodtype', card);
    }
    section.appendChild(row);
}
function createRestaurantElement(element, data, className, parent){
    let e = document.createElement(element);
    e.innerHTML = data;
    e.class = className;
    parent.appendChild(e);
    return e;
}
let createLiteral = (rest) => {
    return `<div class="restaurant">
    <p>${rest.name}</p>
    <img src="${rest.img}"/>
    <p class="deliverytime">${rest.eta}</p>
    <p class="rating">${rest.rating} stars</p>
    <p class="foodtype">${rest.type}</p>
    </div>`
}