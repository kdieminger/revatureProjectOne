import React, { SyntheticEvent, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RestaurantState } from '../reducer';
import './restaurant.css';
import restaurantService from './restaurant.service';
import { changeRestaurant } from '../actions';
import { Restaurant } from './restaurant';

// This is the prop I want to connect from redux
const restaurantProp = (state: RestaurantState) => ({restaurant: state.restaurant});
// This is the dispatcher I want to use from redux
const mapDispatch = {
    updateRestaurant: (restaurant: Restaurant) => changeRestaurant(restaurant),
};
// Put them in the connector
const connector = connect(restaurantProp, mapDispatch);

// Function Component
// get the types of the props we created above so we can tell our component about them.
type PropsFromRedux = ConnectedProps<typeof connector>;

function AddRestaurantComponent(props: PropsFromRedux) {
    const FIELDS = ['img', 'name', 'eta', 'rating', 'type'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...props.restaurant };
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateRestaurant(r);
    }
    function submitForm() {
        restaurantService.addRestaurant(props.restaurant).then(() => {
            props.updateRestaurant(new Restaurant());
            // call the callback function from the parent component so that it will re-render
            history.push('/restaurants');
        });
    }
    return (
        <div className='col restaurant card'>
            {FIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'r_' + fieldName}
                            value={(props.restaurant as any)[fieldName]}
                            onChange={handleFormInput}
                        ></input>
                    </div>
                );
            })}
            <button className='btn btn-primary' onClick={submitForm}>
                Add Restaurant
            </button>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddRestaurantComponent);
