import { AppRequest } from './request';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState, UserState } from '../reducer';
import { useHistory } from 'react-router-dom';
import requestService from './request.service';
import { changeRequest } from '../actions';
import { SyntheticEvent, useEffect } from 'react';
import userService from '../user/user.service';

type PropType = { request: AppRequest };


function AdminReqRow(props: PropType) {
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
    }, [dispatch, props.request.requestID]);

    function handleFormInput(e: SyntheticEvent) {
        console.log('handleFormInput');
        let r: any = { ...request };
        console.log(r);
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeRequest(r));
    }

    function approveRequest() {
        request.approval.push(true);
        if (user.role === 'Department Head' && target.supervisor === user.username) {
            request.approval.push(true);
        }
        else if (user.role === 'BenCo') {
            if (target.supervisor === user.username) {
                request.approval.push(true, true);
            }
            request.appStatus = 'approved';
            target.availableReim = target.availableReim - props.request.projectedRe;
        }
        userService.updateUser(target).then(() => {
        })
        requestService.updateRequest(request).then(() => {
            console.log(target);
            history.push('/home');
        })
    }

    function denyRequest() {
        request.approval.push(false);
        request.appStatus = 'denied';
        requestService.updateRequest(request).then(() => {
            dispatch(changeRequest(new AppRequest()));
            history.push('/home');
        })
    }

    function goToRequestInfo() {
        history.push('/' + request.requestID + '/reqinfo');
    }

    return (
        <div>
            <h2>Requests Awaiting Approval for {target.username}:</h2>
            {user.role === 'Supervisor' && props.request.approval.length === 0 && (
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
                                    <td>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
            {user.role === 'Department Head' && target.supervisor === user.username && props.request.approval.length === 0 && (
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
                                    <td>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
            {user.role === 'Department Head' && target.supervisor !== user.username && props.request.approval.length === 1 && props.request.appStatus !== 'denied' && (
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
                                    <td>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
            {user.role === 'BenCo' && target.supervisor !== user.username && props.request.approval.length === 2 && props.request.appStatus !== 'denied' && (
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
                                <tbody>
                                    <tr>
                                        <td><button className='btn btn' onClick={approveRequest}>Approve</button></td>
                                        <td><button className='btn btn' onClick={denyRequest}>Deny</button></td>
                                        <td>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></td>
                                    </tr>
                                    <tr>
                                        <td><button className='myButton' onClick={goToRequestInfo}>Request More Information</button></td>
                                    </tr>
                                </tbody>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
            {user.role === 'BenCo' && target.supervisor === user.username && props.request.approval.length === 0 && (
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
                                    <td>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    )
}

export default AdminReqRow;