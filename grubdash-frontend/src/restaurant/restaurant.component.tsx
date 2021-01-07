import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './restaurant.css';
import { Restaurant } from './restaurant';

interface RestaurantProps {
    data: Restaurant;
}

function RestaurantComponent(props: RestaurantProps) {
    const history = useHistory();

    function goToRestaurant() {
        history.push('/restaurants/'+props.data.name);
    }

    return (
        <div className='col restaurant card'>
            <img
                src={props.data.img}
                className='card-img-top rest-logo'
                alt={props.data.name}
                onClick={goToRestaurant}
            />
            <div className='card-body'>
                <p className=''>{props.data.name}</p>
                <p className='deliverytime'>{props.data.eta}</p>
                <p className='rating'>{props.data.rating}</p>
                <p className='foodtype'>{props.data.type}</p>
                <Link to={`/restaurants/${props.data.name}`}>
                    {' '}
                    See more info{' '}
                </Link>
            </div>
        </div>
    );
}

export default RestaurantComponent;
