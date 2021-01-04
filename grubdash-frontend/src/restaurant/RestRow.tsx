import React from 'react';
import Restaurant from './Restaurant';
import { RestaurantType } from './restaurant.types';

function RestRow(props: any) {
    console.log(props);
    return (
        <section className="row border">
            {props.restaurants.map((rest: RestaurantType, index: number) => 
                <Restaurant key = {'rest-'+index} restaurant = {rest}></Restaurant>)}
        </section>
    );
  }
  
  export default RestRow;