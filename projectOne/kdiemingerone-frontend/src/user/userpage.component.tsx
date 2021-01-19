import { RequestState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './userpage.css';
import requestService from '../request/request.service';
import { ChangeRFIs } from '../actions';

// Function Component
export default function UserPageComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const RFISelector = (state: RequestState) => state.RFIs;
    const RFIs = useSelector(RFISelector);
    const history = useHistory();
    const dispatch = useDispatch();

    function goToRequests() {
        history.push('/users/' + user.username + '/requests');
    }

    function goToRFIs(){
        requestService.getRFIs(user.username).then((arr) => {
            dispatch(ChangeRFIs(arr));
            console.log(RFIs);
        })
        history.push('/users/' + user.username + '/RFIs');
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
                <button className='viewButtons' onClick={goToRequests}>View Requests</button>
            </div>
            {user.numRFI !== 0 && (
                <div>
                    <br/>
                    <button className='viewButtons' onClick={goToRFIs}>Requests for Information</button>
                </div>
            )}
            {user.role === 'Supervisor' && (
                <div>
                    <br/>
                    <button className='viewButtons' onClick={goToEmployees}>View Your Employees</button>
                </div>
            )}
            {user.role === 'Department Head' && (
                <div>
                    <br/>
                    <button className='viewButtons' onClick={goToDeptEmployees}>View Department Employees</button>
                </div>
            )}
            {user.role === 'BenCo' && (
                <div>
                    <br/>
                    <button className='viewButtons' onClick={goToAllEmployees}>View Employees</button>
                </div>
            )}
        </div>
    )
}
