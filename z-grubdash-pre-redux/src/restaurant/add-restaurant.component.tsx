import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './restaurant.css';
import restaurantService from './restaurant.service';

// Function Component
function AddRestaurantComponent(props: object) {
    const rTemplate: any = {
        img: '',
        name: '',
        eta: 0,
        rating: 0,
        menu: [],
        hours: [],
        type: '',
        chef: '',
    };
    let [restaurant, setRestaurant] = useState(rTemplate);
    const FIELDS = ['img', 'name', 'eta', 'rating', 'type'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let r = { ...restaurant };
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        setRestaurant(r);
    }
    function submitForm() {
        restaurantService.addRestaurant(restaurant).then(() => {
            setRestaurant(rTemplate);
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
                            value={restaurant[fieldName]}
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

export default AddRestaurantComponent;
