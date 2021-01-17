import { AppRequest } from './request';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState, UserState } from '../reducer';
import { useHistory } from 'react-router-dom';
import requestService from './request.service';
import { changeRequest, SwitchRequests } from '../actions';
import { useEffect } from 'react';
import userService from '../user/user.service';

type PropType = { request: AppRequest };


function ReqRow(props: PropType) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const requestSelector = (state: RequestState) => state.request;
    const request = useSelector(requestSelector);
    const targetSelector = (state: UserState) => state.targetUser;
    const target = useSelector(targetSelector);

    useEffect(() => {
        requestService.getRequest(props.request.requestID).then((req) => {
            dispatch(changeRequest(req));
        })
    }, []);

    function approveRequest() {
        request.approval.push(true);
        if (user.role === 'Department Head' && target.supervisor === user.username) {
            request.approval.push(true);
        }
        else if (user.role === 'BenCo') {
            if (target.supervisor === user.username) {
                request.approval.push(true, true);
            }
            props.request.appStatus = 'approved';
            target.availableReim = target.availableReim - props.request.projectedRe;
        }
        requestService.updateRequest(request).then(() => {
            console.log('updating request');
            console.log(target);
            history.push('/home');
        })
    }

    function denyRequest() {
        console.log(request);
        request.approval.push(false);
        request.appStatus = 'denied';
        requestService.updateRequest(request).then(() => {
            dispatch(changeRequest(new AppRequest()));
            console.log('updating request');
            history.push('/home')
        })
    }

    return (
        <div>
            <h2>Requests Awaiting Approval for {target.username}:</h2>
            {user.role === 'Supervisor' && props.request.approval.length == 0 && (
                <section className="row border">
                    <table className='myTable'>
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
                                <td>{props.request.appStatus}</td>
                            </tr>
                            {user.username !== props.request.username && (
                                <tr>
                                    <td><button className='btn btn' onClick={approveRequest}>Approve</button></td>
                                    <td><button className='btn btn' onClick={denyRequest}>Deny</button></td>
                                </tr>
                            )}  
                        </tbody>
                    </table>
                </section>
            )}
            {user.role == 'Department Head' && target.supervisor == user.username && props.request.approval.length == 0 && (
                <section className="row border">
                    <table className='myTable'>
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
                                <td>{props.request.appStatus}</td>
                            </tr>
                            {user.username !== props.request.username && (
                                <tr>
                                    <td><button className='btn btn' onClick={approveRequest}>Approve</button></td>
                                    <td><button className='btn btn' onClick={denyRequest}>Deny</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
            {user.role == 'Department Head' && target.supervisor !== user.username && props.request.approval.length == 1 && props.request.appStatus != 'denied' &&(
                <section className="row border">
                    <table className='myTable'>
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
                                <td>{props.request.appStatus}</td>
                            </tr>
                            {user.username !== props.request.username && (
                                <tr>
                                    <td><button className='btn btn' onClick={approveRequest}>Approve</button></td>
                                    <td><button className='btn btn' onClick={denyRequest}>Deny</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
            {user.role == 'BenCo' && target.supervisor !== user.username && props.request.approval.length == 2 && props.request.appStatus !== 'denied' &&(
                <section className="row border">
                    <table className='myTable'>
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
                                <td>{props.request.appStatus}</td>
                            </tr>
                            {user.username !== props.request.username && (
                                <tr>
                                    <td><button className='btn btn' onClick={approveRequest}>Approve</button></td>
                                    <td><button className='btn btn' onClick={denyRequest}>Deny</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
            {user.role == 'BenCo' && target.supervisor == user.username && props.request.approval.length == 0 && (
                <section className="row border">
                    <table className='myTable'>
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
                                <td>{props.request.appStatus}</td>
                            </tr>
                            {user.username !== props.request.username && (
                                <tr>
                                    <td><button className='btn btn' onClick={approveRequest}>Approve</button></td>
                                    <td><button className='btn btn' onClick={denyRequest}>Deny</button></td>
                                </tr>  
                            )}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    )
}

export default ReqRow;