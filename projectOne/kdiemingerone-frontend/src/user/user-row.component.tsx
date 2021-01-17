import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeUser } from '../actions';
import { UserState } from '../reducer';
import { User } from './user';

type PropType = { user: User};

function UserRow(props: PropType){
    const history = useHistory();
    const dispatch = useDispatch();
    const targetSelector = (state: UserState) => state.targetUser;
    const target = useSelector(targetSelector);

    function goToRequests(){  
        dispatch(changeUser(props.user));
        history.push('/users/'+props.user.username+'/admin/requests');
    }

    return (
        <section className="row border">
            <table className='table'>
                <tbody> 
                <tr>
                    <td>{props.user.username}</td>
                    <td>{props.user.numReqs}</td>
                    <td><button className='btn'onClick={goToRequests}>View Requests</button></td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default UserRow;