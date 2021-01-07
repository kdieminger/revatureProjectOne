import React from 'react';
import './restaurant.css';
import { Restaurant } from './restaurant';

interface RestaurantProps {
    data: Restaurant;
}

// Function Component
function RestaurantComponent(props: RestaurantProps) {
    return (
        <div className='col restaurant card'>
            <img
                src={props.data.img}
                className='card-img-top rest-logo'
                alt={props.data.name}
            />
            <div className='card-body'>
                <p className=''>{props.data.name}</p>
                <p className='deliverytime'>{props.data.eta}</p>
                <p className='rating'>{props.data.rating}</p>
                <p className='foodtype'>{props.data.type}</p>
            </div>
        </div>
    );
}

export default RestaurantComponent;
