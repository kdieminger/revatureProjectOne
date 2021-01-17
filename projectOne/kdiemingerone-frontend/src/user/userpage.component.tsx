import { RequestState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';

interface UserPageProps {
    match: any;
}

// Function Component
export default function UserPageComponent() {
    const reqSelector = (state: RequestState) => state.requests;
    const reqs = useSelector(reqSelector);
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function goToRequests() {
        history.push('/users/' + user.username + '/requests');
    }

    function goToEmployees() {
        history.push('/users/' + user.username + '/employees');
    }
    
    function goToDeptEmployees() {
        history.push('/users/' + user.department + '/employees');
    }

    return (
        <div>
            <div>
                <button className='btn btn' onClick={goToRequests}>View Requests</button>
            </div>
            {user.role === 'Supervisor' && (
                <div>
                    <button className='btn btn' onClick={goToEmployees}>View Your Employees</button>
                </div>
            )}
            {user.role === 'Department Head' && (
                <div>
                    <button className='btn btn' onClick={goToDeptEmployees}>View Department Employees</button>
                </div>
            )}
        </div>
    )
}
