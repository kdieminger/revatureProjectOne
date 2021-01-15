import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Route,
    BrowserRouter,
    Link,
    Redirect,
    useHistory,
} from 'react-router-dom';
import AddRequestComponent from './request/add-request.component';
import { getUser } from './actions';
import { UserState } from './reducer';
import LoginComponent from './user/login.component';
import { User } from './user/user';
import userService from './user/user.service';
import RequestBySupervisorComponent from './request/request-by-supervisor.component';
import UserPageComponent from './user/userpage.component';


export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();
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
                            <li>
                                {user.username ? (
                                    <div>
                                        <button className='link' onClick={logout}>
                                            Logout
                                        </button>
                                        <div>
                                            <Link to='/requestform'>Make a Reimbursement Request</Link>
                                        </div>
                                    </div>
                                ) : (
                                        <Link to='/login'>Login</Link>
                                    )}
                            </li>
                        </ul>
                    </nav>
                </header>

                <Route path='/login' component={LoginComponent} />
                <Route path='/users/:id' component={UserPageComponent}/>
                <Route path='/requestform' component={AddRequestComponent} />
                <Route exact path='/users/supervisor/requests' component={RequestBySupervisorComponent} />
            </div>
        </BrowserRouter>
    )
}