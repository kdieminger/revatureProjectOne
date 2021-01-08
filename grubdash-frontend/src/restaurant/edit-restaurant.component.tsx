import React, { SyntheticEvent, useState, useEffect } from 'react';
import './restaurant.css';
import restaurantService from './restaurant.service';
import {withRouter, useHistory} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { RestaurantState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeRestaurant } from '../actions';
import { Restaurant } from './restaurant';


interface Params {
    id: string;
}
// Function Component
function EditRestaurantComponent(props: RouteComponentProps<Params>) {
    const restaurantSelector = (state: RestaurantState) => state.restaurant;
    const restaurant = useSelector(restaurantSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(props);
        console.log(props.match.params.id);
        restaurantService.getRestaurant(props.match.params.id).then((rest)=> {
            console.log(rest);
            dispatch(changeRestaurant(rest));
        })
    }, [props.match.params.id]);
    const FIELDS = ['img', 'name', 'eta', 'rating', 'type'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...restaurant };
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeRestaurant(r));
    }
    function submitForm() {
        restaurantService.updateRestaurant(restaurant).then(() => {
            dispatch(changeRestaurant(new Restaurant()));
            console.log('Updating restaurant!')
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
                            value={(restaurant as any)[fieldName]}
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

export default withRouter(EditRestaurantComponent);
