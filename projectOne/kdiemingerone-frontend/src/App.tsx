import React, { useState, useEffect } from 'react';
import './App.css';
import RouterComponent from './routing.component';
import userService from './user/user.service';
import { useDispatch } from 'react-redux';
import { getUser } from './actions';

function App() {
  const [cond, setCond] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    userService.getLogin().then((user) => {
      console.log(user);
      dispatch(getUser(user));
    });
  }, [dispatch]);
  
  return (
    <div className='container'>
      <RouterComponent></RouterComponent>
      
    </div>
  )
}

export default App;
