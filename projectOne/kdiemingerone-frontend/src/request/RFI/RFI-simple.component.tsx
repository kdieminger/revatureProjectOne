import { RFI } from '../request';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChangeRFI, changeTarget } from '../../actions';
import userService from '../../user/user.service';
import { UserState } from '../../reducer';

type PropType = { rfi: RFI };


function SimpleRFIComponent(props: PropType) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    function goToRespond() {
        userService.getUser(props.rfi.from).then((ind) => {
            dispatch(changeTarget(ind));
        })
        dispatch(ChangeRFI(props.rfi));
        history.push('/users/'+user.username+'/RFIs/respond');
    }

    return (
        <div>
                <div>
                    <p>From: {props.rfi.from}</p>
                    <button onClick={goToRespond}>View and Respond</button>
                </div>
        </div>
    )
}

export default SimpleRFIComponent;