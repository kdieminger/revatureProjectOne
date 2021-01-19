import { RFI } from '../request';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeTarget } from '../../actions';
import userService from '../../user/user.service';
import { UserState } from '../../reducer';

type PropType = { ref: RFI };


function SimpleRFIComponent(props: PropType) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    function goToRespond() {
        userService.getUser(props.ref.from).then((ind) => {
            dispatch(changeTarget(ind));
        })
        history.push('/users/'+user.username+'/RFIs/respond');
    }

    console.log(props.ref);

    return (
        <div>
                <div>
                    <p>From: {props.ref.from}</p>
                    <button onClick={goToRespond}>View and Respond</button>
                </div>
        </div>
    )
}

export default SimpleRFIComponent;