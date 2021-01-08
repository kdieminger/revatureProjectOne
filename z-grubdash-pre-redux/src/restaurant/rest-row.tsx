import React from 'react';
import RestaurantComponent from './restaurant.component';
import { Restaurant } from './restaurant';

function RestRow(props: any) {
    console.log(props);
    return (
        <section className="row border">
            {props.restaurants.map((rest: Restaurant, index: number) => 
                <RestaurantComponent key = {'rest-'+index} data = {rest}></RestaurantComponent>)}
        </section>
    );
  }
  
  export default RestRow;