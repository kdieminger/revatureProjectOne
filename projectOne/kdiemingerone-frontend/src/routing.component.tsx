import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Route,
    BrowserRouter,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';
import AddRequestComponent from './request/add-request.component';
import { GetUser } from './actions';
import { UserState } from './reducer';
import LoginComponent from './user/login.component';
import { User } from './user/user';
import userService from './user/user.service';
import UserPageComponent from './user/userpage.component';
import UserRequestsComponent from './user/user-requests.component';
import UsersBySupervisorComponent from './user/users-by-supervisor.component';
import SupReqComponent from './request/sup-requests.component';
import ErrorBoundaryComponent from './error.component';


export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    function logout() {
        userService.logout().then(() => {
            dispatch(GetUser(new User()));
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
                                        <div>
                                            <Link to={'/home'}>Home</Link>
                                        </div>
                                        <button className='btn' onClick={logout}>
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

                <ErrorBoundaryComponent key={location.pathname}>
                    <Route 
                        exact
                        path='/' 
                        render={() => 
                            user.username ? (
                                <LoginComponent />
                            ) : (
                                <Redirect to='/login' />
                            )
                        }
                    />
                    <Route
                        exact
                        path='/home'
                        render={() =>
                            user.username ? (
                                <UserPageComponent />
                            ) : (
                                <Redirect to='/login' />
                            )
                        }
                    />
                    <Route
                        exact
                        path='/requestform'
                        render={() => 
                            user.username ? (
                                <AddRequestComponent />
                            ) : (
                                <Redirect to='/login' />
                            )
                        }
                    />
                    <Route 
                        exact
                        path='/users/:id/requests'
                        render={() => 
                            user.username ? (
                                <UserRequestsComponent />
                            ) : (
                                <Redirect to='/login' />
                            )
                        }
                    />
                    <Route 
                        exact
                        path='/users/:id/employees'
                        render={() => 
                            user.username && user.role !== 'Employee' ? (
                                <UsersBySupervisorComponent />
                            ) : (
                                <Redirect to='/home'/>
                            )
                        }
                    />
                    <Route 
                        exact
                        path='/users/:id/sup/requests'
                        render={() => 
                            user.username && user.role !== 'Employee' ? (
                                <SupReqComponent />
                            ) : (
                                <Redirect to='/home'/>
                            )
                        }
                    />
                </ErrorBoundaryComponent>

                <Route path='/login' component={LoginComponent} />
                <Route exact path='/users/:id/sup/requests' component={SupReqComponent} />
            </div>
        </BrowserRouter>  
    )
}