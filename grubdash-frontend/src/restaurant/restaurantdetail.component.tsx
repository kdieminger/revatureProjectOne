import {useEffect, useState} from 'react';
import { Restaurant } from './restaurant';
import restaurantService from './restaurant.service';

interface RestaurantDetailProps {
    match: any;
}
export default function RestaurantDetailComponent(props: RestaurantDetailProps) {
    const [rest, setRest] = useState(new Restaurant());
    useEffect(()=>{
        console.log(props);
        console.log(props.match.params.id);
        restaurantService.getRestaurant(props.match.params.id).then((rest)=> {
            console.log(rest);
            setRest(rest);
        })
    }, [props.match.params.id]);
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
                <p className='chef'>{rest.chef}</p>
                <div className = "menu"> <label id = "labelMenu">Menu:</label> {rest.menu.map(item => {
                   return (<div>
                   <div>{`${item.name}`}</div>
                   <div>{`price:$${item.price}`}</div>
                   </div>
                   )
                })}
                </div>
               
                <p className='hours'>{JSON.stringify(rest.hours)}</p> 
            </div>
        </div>
    );

}