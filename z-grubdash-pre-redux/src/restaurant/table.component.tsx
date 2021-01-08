import { useState, useEffect } from 'react';
import { Restaurant } from './restaurant';
import restaurantService from './restaurant.service';
import RestRow from './rest-row';

function groupIntoThrees(restaurants: Restaurant[]): Restaurant[][] {
    let arr: Restaurant[][] = [];
    for (let i = 0; i < restaurants.length / 3; i++) {
        arr.push(restaurants.slice(i * 3, (i + 1) * 3));
    }

    return arr;
}
export default function TableComponent() {
    let r: Restaurant[] = [];
    const [restaurants, setRestaurants] = useState(r);
    useEffect(() => {
        restaurantService.getRestaurants().then((data) => {
            setRestaurants(data);
        });
    }, []);

    function updateRestaurants() {
        console.log('hello from outside the promise.');
        restaurantService.getRestaurants().then((data) => {
            console.log('hello from the update restaurants function');
            setRestaurants(data);
        });
    }
    return (
        <section className='restaurants container' id='restaurants'>
            {groupIntoThrees(restaurants).map((value, index: number) => {
                return (
                    <RestRow
                        key={'rest-row-' + index}
                        restaurants={value}
                    ></RestRow>
                );
            })}
        </section>
    );
}
