import { AppRequest } from './request';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState, UserState } from '../reducer';
import { useHistory } from 'react-router-dom';
import requestService from './request.service';
import { changeRequest } from '../actions';

type PropType = { request: AppRequest };


function ReqRow(props: PropType) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const requestSelector = (state: RequestState) => state.request;
    const request = useSelector(requestSelector);

    function approveRequest() {
        dispatch(changeRequest(props.request));
        props.request.approval.push(true);
        props.request.appStatus = 'denied';
        dispatch(changeRequest(props.request));
        requestService.updateRequest(request).then(() => {
            console.log('updating request');
            history.push('/home');
        })
    }

    function denyRequest() {
        dispatch(changeRequest(props.request));
        props.request.approval.push(false);
        dispatch(changeRequest(props.request));
        requestService.updateRequest(request).then(() => {
            console.log('updating request');
            history.push('/home')
        })
    }

    console.log(request.approval);

    return (
        <section className="row border">
            <table className='table'>
                <tbody>
                    <tr>
                        <td>{props.request.requestID}</td>
                        <td>{props.request.username}</td>
                        <td>{props.request.type}</td>
                        <td>{props.request.date}</td>
                        <td>{props.request.time}</td>
                        <td>{props.request.location}</td>
                        <td>{props.request.description}</td>
                        <td>{props.request.cost}</td>
                        <td>{props.request.justification}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default ReqRow;