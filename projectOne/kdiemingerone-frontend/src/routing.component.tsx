import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Route,
    BrowserRouter,
    Link,
    Redirect,
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
import AdminReqComponent from './request/admin-requests.component';
import ErrorBoundaryComponent from './error.component';
import UsersByDepComponent from './user/users-by-department';
import AllUsersComponent from './user/all-employees.component';
import RFIRow from './request/RFI/RFI-row.component';
import RFIComponent from './request/RFI/RFI.component';
import AddRFIComponent from './request/RFI/addRFI.component';


export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const location = useLocation();
    const dispatch = useDispatch();
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
                        {user.username ? (
                            <ul>
                                <li>
                                    <Link to={'/home'}>Home</Link>
                                </li>
                                <button className='btn' onClick={logout}>
                                    Logout
                                        </button>
                                <li>
                                    <Link to='/requestform'>Make a Reimbursement Request</Link>
                                </li>
                            </ul>
                        ) : (
                                <ul>
                                    <li>
                                        <Link to='/login'>Login</Link>
                                    </li>
                                </ul>
                            )}
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
                                    <Redirect to='/home' />
                                )
                        }
                    />
                    <Route
                        exact
                        path='/users/:id/dept/employees'
                        render={() =>
                            user.username && user.role === 'Department Head' ? (
                                <UsersByDepComponent />
                            ) : (
                                    <Redirect to='/home' />
                                )
                        }
                    />
                    <Route
                        exact
                        path='/users/:id/admin/requests'
                        render={() =>
                            user.username && user.role !== 'Employee' ? (
                                <AdminReqComponent />
                            ) : (
                                    <Redirect to='/home' />
                                )
                        }
                    />
                    <Route
                        exact
                        path='/users/all'
                        render={() =>
                            user.username && user.role === 'BenCo' ? (
                                <AllUsersComponent />
                            ) : (
                                    <Redirect to='/home' />
                                )
                        }
                    />
                    <Route
                        exact path='/users/:id/RFIs'
                        render={() => user.username ? (
                            <RFIRow />
                        ) : <Redirect to='/home' />}
                    />
                    <Route
                        exact path='/users/:id/RFIs/respond'
                        render={() => user.username ? (
                            <RFIComponent />
                        ) : (<Redirect to='/home' />)}
                    />
                    <Route
                        exact path='/:id/reqinfo'
                        render={() => user.username ? (
                            <AddRFIComponent />
                        ) : (<Redirect to='/home' />)}
                    />
            </ErrorBoundaryComponent>

                <Route path='/login' component={LoginComponent} />
            </div>
        </BrowserRouter >
    )
}