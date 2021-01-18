import { useHistory } from 'react-router-dom';
import './request.css';
import { AppRequest } from './request';

interface RequestProps {
    data: AppRequest;
}

export function RequestComponent(props: RequestProps) {

    console.log(props.data.username);

    return (
        <div className='col request card'>
            <div className='card-body'>
                <p className='user'>{props.data.username}</p>
                <p className='event-type'>{props.data.type}</p>
                <p className='event-date'>{props.data.date}</p>
                <p className='event-time'>{props.data.time}</p>
                <p className='event-location'>{props.data.location}</p>
            </div>
        </div>
    );
}

export default RequestComponent;
