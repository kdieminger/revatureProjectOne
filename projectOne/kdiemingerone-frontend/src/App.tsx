import React, { useEffect } from 'react';
import './App.css';
import RouterComponent from './routing.component';
import userService from './user/user.service';
import { useDispatch } from 'react-redux';
import { GetUser } from './actions';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    userService.getLogin().then((user) => {
      dispatch(GetUser(user));
    });
  }, [dispatch]);

  return (
    <div className='container'>
      <BrowserRouter>
        <RouterComponent></RouterComponent>
      </BrowserRouter>

    </div>
  )
}

export default App;
