import React, { useState } from "react";
import "./App.css";
import RestaurantClassComponent from "./restaurant/restaurantclass.component";
import RouterComponent from "./routing.component";
import userContext from "./user.context";
import { User } from "./user/user";

function App() {
  /* useState: A hook that can create a variable and a 
      setter to add to the state of the application and modify
      that state to trigger a render.*/
  const [cond, setCond] = useState(true);

  // I'm defining state here in the app
  const [user, setUser] = useState(new User());

  return (
    // I'm using the context to provide that state to the children of this component.
    <userContext.Provider value={[user, setUser]}>
      <div className="container">
        {/* {'user'+user?.name} */}
        <RouterComponent></RouterComponent>
        {cond ? (
          <RestaurantClassComponent which={1}></RestaurantClassComponent>
        ) : (
          ""
        )}
        <button
          onClick={() => {
            setCond(!cond);
          }}
        >
          Click Me.
        </button>
      </div>
    </userContext.Provider>
  );
}

export default App;
