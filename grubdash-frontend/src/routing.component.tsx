import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import AddRestaurantComponent from "./restaurant/add-restaurant.component";
import TableComponent from "./restaurant/table.component";

export default function RouterComponent() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>Grubdash</h1>
          <p className="hero">Delicious food straight to you.</p>
          <div className="input">
            <input type="text" placeholder="Delivery address" />
            <button type="submit">Search</button>
          </div>
          <nav id="nav">
            <ul>
              <li>
                <Link to="/addRestaurant">Add Restaurant</Link>
              </li>
              <li>
                <Link to="/restaurants">View Restaurants</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <div id="restForm"></div>
        </header>
        <Route
          path="/addRestaurant"
          render={() => (
            <AddRestaurantComponent
              formSubmit={() => {}}
            ></AddRestaurantComponent>
          )}
        />
        <Route path="/restaurants" component={TableComponent} />
      </div>
    </BrowserRouter>
  );
}
