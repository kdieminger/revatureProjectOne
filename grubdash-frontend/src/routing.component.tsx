import React from 'react';
import { Route, Link, Redirect, useLocation } from 'react-router-dom';
import AddRestaurantComponent from './restaurant/add-restaurant.component';
import EditRestaurantComponent from './restaurant/edit-restaurant.component';
import TableComponent from './restaurant/table.component';
import LoginComponent from './user/login.component';
import userService from './user/user.service';
import RestaurantDetailComponent from './restaurant/restaurantdetail.component';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions';
import { UserState } from './reducer';
import { User } from './user/user';
import ErrorBoundaryComponent from './error.component';

export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    function logout() {
        userService.logout().then(() => {
            dispatch(getUser(new User()));
        });
    }
    return (
        <div>
            <header>
                <h1>Grubdash</h1>
                <p className='hero'>Delicious food straight to you.</p>
                <div className='input'>
                    <input type='text' placeholder='Delivery address' />
                    <button type='submit'>Search</button>
                </div>
                <nav id='nav'>
                    <ul>
                        {user.role === 'Employee' && (
                            <li>
                                <Link to='/addRestaurant'>Add Restaurant</Link>
                            </li>
                        )}
                        <li>
                            <Link to='/restaurants'>View Restaurants</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                        <li>
                            {user.name ? (
                                <button className='link' onClick={logout}>
                                    Logout
                                </button>
                            ) : (
                                <Link to='/login'>Login</Link>
                            )}
                        </li>
                    </ul>
                </nav>
                <div id='restForm'></div>
            </header>
            <ErrorBoundaryComponent key={location.pathname}>
            <Route
                exact
                path='/'
                render={() => <Redirect to='/restaurants'></Redirect>}
            />
            <Route
                path='/addRestaurant'
                render={() =>
                    user.role !== 'Employee' ? (
                        <Redirect to='/restaurants' />
                    ) : (
                        <AddRestaurantComponent />
                    )
                }
            />

            <Route
                exact
                path='/restaurants/:id'
                component={RestaurantDetailComponent}
            />
            <Route exact path='/restaurants' component={TableComponent} />
            <Route path='/login' component={LoginComponent} />
            <Route
                exact
                path='/restaurants/:id/edit'
                component={EditRestaurantComponent}
            />
            </ErrorBoundaryComponent>
        </div>
    );
}
