import React, { SyntheticEvent, useEffect } from 'react';
import { User } from './user';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions';

interface Params {
    id: string;
}

// Function Component
function LoginComponent(props: any) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'username'){
            u.name = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(getUser(u));
    }
    function submitForm() {
        userService.login(user).then((user) => {
            dispatch(getUser(user));
            history.push('/restaurants');
        });
    }
    return (
        
        <div className='col restaurant card'>
           Username <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
           <br/>
           Password <input type='password' className='form-control' onChange={handleFormInput} name='password'/>
           <br/>
           <button className='btn btn-danger' onClick={submitForm}>Login</button>
        </div>
    );
}

export default LoginComponent;
