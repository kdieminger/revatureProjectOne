import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './request.css';
import { Request } from './request';

interface RequestProps {
    data: Request;
}

function RequestComponent(props: RequestProps) {
    const history = useHistory();

    function goToRequest() {
        history.push('/request/'+props.data.requestID);
    }

    return (
        <div className='col request card'>
            <div className='card-body'>
                <p className='user'>{props.data.username}</p>
                <p className='event-type'>{props.data.type}</p>
                <p className='event-date'>{props.data.date}</p>
                <p className='event-time'>{props.data.time}</p>
                <p className='event-location'>{props.data.location}</p>
                <Link to={`/restaurants/${props.data.requestID}`}>
                    {' '}
                    See more info{' '}
                </Link>
            </div>
        </div>
    );
}

export default RequestComponent;
