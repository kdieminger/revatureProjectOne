import {useEffect, useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Restaurant } from './restaurant';
import restaurantService from './restaurant.service';
import UserContext from '../user.context'
import { User } from '../user/user';

interface RestaurantDetailProps {
    match: any;
}

export default function RestaurantDetailComponent(props: RestaurantDetailProps) {
    const [rest, setRest] = useState(new Restaurant());
    const history = useHistory();
    const [userContext, setUserContext]= useContext(UserContext);
    // useEffect(() => {
    //    setUserContext({money: 0, name: "Cynthia", password: "pass", role: 'Employee'});
    // }, []);
    useEffect(()=>{
        console.log(props);
        console.log(props.match.params.id);
        restaurantService.getRestaurant(props.match.params.id).then((rest)=> {
            console.log(rest);
            setRest(rest);
        })
    }, [props.match.params.id]);

    function handleDelete() {
        restaurantService.deleteRestaurant(rest.name).then(()=>{
            history.push('/restaurants')
        });
    }

    return (
        <div className='col restaurant card'>
            <img
                src={rest.img}
                className='card-img-top rest-logo'
                alt={rest.name}
            />
            <div className='card-body'>
                <p className=''>{rest.name}</p>
                <p className='deliverytime'>{rest.eta}</p>
                <p className='rating'>{rest.rating}</p>
                <p className='foodtype'>{rest.type}</p>
            </div>
            {userContext.role === 'Employee' && 
            (<button className='btn btn-danger' 
            onClick={handleDelete}>
                Delete Restaurant</button>)
            }
        </div>            
    );
}