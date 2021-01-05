import React from 'react';
import './restaurant.css';

function Restaurant(props: any) {
    return (
        <div className="col restaurant card">
            <img src={props.restaurant.img}
            className="card-img-top rest-logo" alt={props.restaurant.name}/>
            <div className="card-body">
                <p className="">{props.restaurant.name}</p>
                <p className="deliverytime">{props.restaurant.eta}</p>
                <p className="rating">{props.restaurant.rating}</p>
                <p className="foodtype">{props.restaurant.type}</p>
            </div>
        </div>
    );
  }
  
  export default Restaurant;