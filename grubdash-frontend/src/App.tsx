import React, {useEffect, useState} from 'react';
import './App.css';
import { Restaurant } from './restaurant/restaurant';
import TableComponent from './restaurant/table.component';
import RestaurantClassComponent from './restaurant/restaurantclass.component';
import AddRestaurantComponent from './restaurant/add-restaurant.component';
import RouterComponent from './routing.component';

function App() {

  /* useState: A hook that can create a variable and a 
      setter to add to the state of the application and modify
      that state to trigger a render.*/
  const [cond, setCond] = useState(true);

  
  return (
    <div className="container">
      <RouterComponent></RouterComponent>
      {cond ? <RestaurantClassComponent which={1}></RestaurantClassComponent>: ''}
      <button onClick={()=>{setCond(!cond);}}>Click Me.</button>
		</div>
  );
}

export default App;
