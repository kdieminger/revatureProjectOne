import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Route,
    BrowserRouter,
    Link,
    Redirect,
} from 'react-router-dom';
import AddRequestComponent from './request/add-request.component';
import { getUser } from './actions';
import { UserState } from './reducer';
import LoginComponent from './user/login.component';
import { User } from './user/user';
import userService from './user/user.service';


export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    function logout() {
        userService.logout().then(() => {
            dispatch(getUser(new User()));
        });
    }
    return (
        <BrowserRouter>
            <div>
                <header>
                    <h1>Company Name</h1>
                    <p>Tuition Reimbursement</p>
                    <nav id='nav'>
                        <ul>
                            {user.role ==='Employee'  && (
                                <li>
                                <Link to='/requestform'>Make a Reimbursement Request</Link>
                                </li>
                            )}
                            <li>
                                {user.username ? (
                                    <button className='link' onClick={logout}>
                                        Logout
                                    </button>
                                ) : (
                                    <Link to='/login'>Login</Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </header>

                <Route path='/login' component={LoginComponent} />
                <Route path='/requestform' component={AddRequestComponent}/>
            </div>
        </BrowserRouter>
    )
}