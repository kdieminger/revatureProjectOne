import React, {useEffect, useState} from 'react';
import './App.css';
import { RestaurantType } from './restaurant/restaurant.types';
import RestRow from './restaurant/RestRow';
import restaurantService from './restaurant/restaurant.service';

function groupIntoThrees(restaurants: RestaurantType[]): RestaurantType[][] {
  let arr: RestaurantType[][] = [];
  for(let i = 0; i < restaurants.length/3; i++) {
    arr.push(restaurants.slice(i*3, (i+1)*3));
  }

  return arr;
}

function App() {
  let r: RestaurantType[] = []
  const [restaurants, setRestaurants] = useState(r);

  useEffect(()=> {
    restaurantService.getRestaurants().then((data)=> {
      setRestaurants(data);
    });
  }, []);

  return (
    <div className="container">
		  <h2>Local Restaurants</h2>
		  <section className="restaurants container" id="restaurants">
        { groupIntoThrees(restaurants).map( (value, index:number) => {
            return <RestRow key={'rest-row-'+index} restaurants={value}></RestRow>
          }) 
        }
      </section>
		</div>
  );
}

export default App;
