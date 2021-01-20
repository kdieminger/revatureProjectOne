import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeTarget } from '../actions';
import { User } from './user';

type PropType = { user: User};

function UserRow(props: PropType){
    const history = useHistory();
    const dispatch = useDispatch();

    function goToRequests(){  
        dispatch(changeTarget(props.user));
        history.push('/users/'+props.user.username+'/admin/requests');
    }

    return (
        <section>
            <br/>
            <div className='detailText'>
                <p>{props.user.username}: <br/>{props.user.numReqs} Pending Request(s)</p>
            </div>
            <p><button className='viewButtons'onClick={goToRequests}>View Requests</button></p>
        </section>
    )
}

export default UserRow;