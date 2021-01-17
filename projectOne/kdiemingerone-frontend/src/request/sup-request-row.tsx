import { AppRequest } from './request';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState, UserState } from '../reducer';
import { useHistory } from 'react-router-dom';
import requestService from './request.service';
import { changeRequest } from '../actions';

type PropType = { request: AppRequest };


function SupReqRow(props: PropType) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const requestSelector = (state: RequestState) => state.request;
    const request = useSelector(requestSelector);

    function approveRequest() {
        dispatch(changeRequest(props.request));
        props.request.approval.push(true);
        if (props.request.approval.length == 3) {
            props.request.appStatus = 'approved';
        }
        dispatch(changeRequest(props.request));
        requestService.updateRequest(request).then(() => {
            console.log('updating request');
            history.push('/home');
        })
    }

    function denyRequest() {
        dispatch(changeRequest(props.request));
        props.request.approval.push(false);
        props.request.appStatus = 'denied';
        dispatch(changeRequest(props.request));
        requestService.updateRequest(request).then(() => {
            console.log('updating request');
            history.push('/home')
        })
    }

    console.log(request.approval);

    return (
        <section className="row border">
            {user.username !== props.request.username && user.role === 'Supervisor' && props.request.approval.length == 0 && (
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
                        <div>
                            <tr>
                                <td><button className='btn' onClick={approveRequest}>Approve</button></td>
                                <td><button className='btn' onClick={denyRequest}>Deny</button></td>
                            </tr>
                        </div>
                    </tbody>
                </table>
            )}
            {user.username !== props.request.username && user.role === 'Department Head' && props.request.approval.length == 1 && props.request.appStatus !== 'denied' && (
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
                        <div>
                            <tr>
                                <td><button className='btn' onClick={approveRequest}>Approve</button></td>
                                <td><button className='btn' onClick={denyRequest}>Deny</button></td>
                            </tr>
                        </div>
                    </tbody>
                </table>
            )}
            {user.username !== props.request.username && user.role === 'BenCo' && props.request.approval.length == 2 && props.request.appStatus !== 'denied' && (
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
                        <div>
                            <tr>
                                <td><button className='btn' onClick={approveRequest}>Approve</button></td>
                                <td><button className='btn' onClick={denyRequest}>Deny</button></td>
                            </tr>
                        </div>
                    </tbody>
                </table>
            )}
        </section>
    )
}

export default SupReqRow;