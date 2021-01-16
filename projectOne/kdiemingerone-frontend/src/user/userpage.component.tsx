import { RequestState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

    return (
        <div>
            <div>
                <button className='btn btn' onClick={goToRequests}>View Requests</button>
            </div>
            {user.role !== 'Employee' && (
                <div>
                    <button className='btn btn' onClick={goToEmployees}>View Your Employees</button>
                </div>
            )}
        </div>
    )
}
