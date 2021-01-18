import { UserState } from '../reducer';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Function Component
export default function UserPageComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const history = useHistory();

    function goToRequests() {
        history.push('/users/' + user.username + '/requests');
    }

    function goToEmployees() {
        history.push('/users/' + user.username + '/employees');
    }
    
    function goToDeptEmployees() {
        history.push('/users/' + user.department + '/dept/employees');
    }

    function goToAllEmployees() {
        history.push('/users/all');
    }

    return (
        <div>
            <div>
                <button className='myButton' onClick={goToRequests}>View Requests</button>
            </div>
            {user.role === 'Supervisor' && (
                <div>
                    <button className='myButton' onClick={goToEmployees}>View Your Employees</button>
                </div>
            )}
            {user.role === 'Department Head' && (
                <div>
                    <button className='myButton' onClick={goToDeptEmployees}>View Department Employees</button>
                </div>
            )}
            {user.role === 'BenCo' && (
                <div>
                    <button className='myButton' onClick={goToAllEmployees}>View Employees</button>
                </div>
            )}
        </div>
    )
}
