import { useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Restaurant } from './restaurant';
import restaurantService from './restaurant.service';
import { RestaurantState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeRestaurant } from '../actions';

interface RestaurantDetailProps {
    match: any;
}

export default function RestaurantDetailComponent(
    props: RestaurantDetailProps
) {
    const restaurantSelector = (state: RestaurantState) => state.restaurant;
    const rest = useSelector(restaurantSelector);
    const userContext = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log(props.match.params.id);
        restaurantService.getRestaurant(props.match.params.id).then((rest)=> {
            console.log(rest);
            dispatch(changeRestaurant(rest));
        })
    }, [dispatch, props.match.params.id]);

    function handleDelete() {
        restaurantService.deleteRestaurant(rest.name).then(() => {
            dispatch(changeRestaurant(new Restaurant()))
            history.push('/restaurants');
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
                <p className='chef'>{rest.chef}</p>
                <div className='menu'>
                    {' '}
                    <label id='labelMenu'>Menu:</label>{' '}
                    {rest.menu.map((item) => {
                        return (
                            <div>
                                <div>{`${item.name}`}</div>
                                <div>{`price:$${item.price}`}</div>
                            </div>
                        );
                    })}
                </div>

                <p className='hours'>{JSON.stringify(rest.hours)}</p>
            </div>
            {userContext.role === 'Employee' && (
                <>
                    <Link
                        className='btn btn-secondary'
                        to={'/restaurants/' + rest.name + '/edit'}
                    >
                        Edit Restaurant
                    </Link>
                    <button className='btn btn-danger' onClick={handleDelete}>
                        Delete Restaurant
                    </button>
                </>
            )}
        </div>
    );
}
