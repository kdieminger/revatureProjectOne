import React, { SyntheticEvent, useState, useEffect } from 'react';
import './restaurant.css';
import restaurantService from './restaurant.service';
import { Restaurant } from './restaurant';

interface EditRestaurantProp {
    formSubmit: Function;
}
// Function Component
function EditRestaurantComponent(props: EditRestaurantProp) {
    // const [rest, setRest] = useState(new Restaurant());
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
    // useEffect(()=>{
    //     console.log(props);
    //     console.log(props.match.params.id);
    //     restaurantService.getRestaurant(props.match.params.id).then((rest)=> {
    //         console.log(rest);
    //         setRest(rest);
    //     })
    // }, [props.match.params.id]);
    const FIELDS = ['img', 'name', 'eta', 'rating', 'type'];
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
        restaurantService.updateRestaurant(restaurant).then(() => {
            setRestaurant(rTemplate);
            console.log('Updating restaurant!')
            // call the callback function from the parent component so that it will re-render
            props.formSubmit();
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
                            //placeholder='blabla'//{rest.fieldName}
                        ></input>
                    </div>
                );
            })}
            <button className='btn btn-primary' onClick={submitForm}>
                Edit Restaurant
            </button>
        </div>
    );
}

export default EditRestaurantComponent;
