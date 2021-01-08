import React from 'react';
import {
    Route,
    BrowserRouter,
    Link,
    useHistory,
    Redirect,
    withRouter,
} from 'react-router-dom';
import AddRestaurantComponent from './restaurant/add-restaurant.component';
import EditRestaurantComponent from './restaurant/edit-restaurant.component';
import TableComponent from './restaurant/table.component';
import LoginComponent from './user/login.component';
import UserContext from './user.context';
import userService from './user/user.service';
import RestaurantDetailComponent from './restaurant/restaurantdetail.component';

export default function RouterComponent() {
    const [user, setUser] = React.useContext(UserContext);
    const history = useHistory();
    function logout() {
        userService.logout().then(() => {
            setUser({ user: null, pass: null });
        });
    }
    return (
        <BrowserRouter>
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
                                    <Link to='/addRestaurant'>
                                        Add Restaurant
                                    </Link>
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
                                    <a className='link' onClick={logout}>
                                        Logout
                                    </a>
                                ) : (
                                    <Link to='/login'>Login</Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                    <div id='restForm'></div>
                </header>

                <Route
                    path='/addRestaurant'
                    render={() =>
                        user.role !== 'Employee' ? (
                            <Redirect to='/restaurants' />
                        ) : (
                            <AddRestaurantComponent/>
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
                <Route exact path='/restaurants/:id/edit' component={EditRestaurantComponent}/>
            </div>
        </BrowserRouter>
    );
}
