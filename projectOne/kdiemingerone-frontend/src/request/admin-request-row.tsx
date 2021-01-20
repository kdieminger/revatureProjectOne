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
            console.log(props.request.requestID);
            console.log(req);
            dispatch(changeRequest(req));
        })
    }, [dispatch, props.request.requestID]);

    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...request };
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeRequest(r));
    }

    function approveRequest() {
        requestService.getRequest(props.request.requestID).then((req) => {
            console.log(req);
            req.approval.push(true);
            if (user.role === 'Department Head' && target.supervisor === user.username) {
                req.approval.push(true);
            }
            else if (user.role === 'BenCo') {
                if (target.supervisor === user.username) {
                    req.approval.push(true, true);
                }
                req.appStatus = 'approved';
            }
            userService.updateUser(target).then(() => {
            })
            requestService.updateRequest(req).then(() => {
                history.push('/home');
            })
            dispatch(changeRequest(req));
        })
    }

    function approveGrade() {
        //target.availableReim = target.availableReim - request.projectedRe;
        userService.updateUser(target);
        requestService.getRequest(props.request.requestID).then((req) => {
            dispatch(changeRequest(req));
            req.approval.push(true);
            req.appStatus = 'approved';
            requestService.updateRequest(req).then(() => {
                history.push('/home');
            })
        })
    }

    function denyRequest() {
        requestService.getRequest(props.request.requestID).then((req) => {
            req.approval.push(false);
            req.appStatus = 'denied';
            userService.updateUser(target);
            requestService.updateRequest(req).then(() => {
                dispatch(changeRequest(new AppRequest()));
                history.push('/home');
            })
        })
    }

    function denyGrade() {
        requestService.getRequest(props.request.requestID).then((req) => {
            req.approval.push(false);
            req.appStatus = 'denied';
            req.notes = 'failing grade';
            requestService.updateRequest(req).then(() => {
                dispatch(changeRequest(new AppRequest()));
                history.push('/home');
            })
        })
    }

    function goToRequestInfo() {
        requestService.getRequest(props.request.requestID).then((req) => {
            console.log(req);
            dispatch(changeRequest(req));
        })
        history.push('/' + request.requestID + '/reqinfo');
    }

    return (
        <div>
            {user.role === 'Supervisor' && props.request.approval.length === 0 && (
                <section>
                    <div className='requestCard'>
                        <h3>{props.request.requestID}</h3>
                        <p>Status: {props.request.appStatus}</p>
                        <p>Type and Location: {props.request.type} at {props.request.location}</p>
                        <p>Date and Time: {props.request.date} at {props.request.time}</p>
                        <p>Description: {props.request.description}</p>
                        <p>Justification: {props.request.justification}</p>
                        <p>Cost: ${props.request.cost}</p>
                        <p>Projected Reimbursement: ${props.request.projectedRe}</p>
                        {user.username !== props.request.username && (
                            <div className='requestCard'>
                                <p><button className='submitButton' onClick={approveRequest}>Approve</button>&nbsp;&nbsp;&nbsp;<button className='submitButton' onClick={denyRequest}>Deny</button></p>
                                <p>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></p>
                                <p><button className='submitButton' onClick={goToRequestInfo}>Request More Information</button></p>
                            </div>
                        )}
                    </div>
                </section>
            )}
            {user.role === 'Department Head' && target.supervisor === user.username && props.request.approval.length === 0 && (
                <section>
                    <div className='requestCard'>
                        <h3>{props.request.requestID}</h3>
                        <p>Status: {props.request.appStatus}</p>
                        <p>Type and Location: {props.request.type} at {props.request.location}</p>
                        <p>Date and Time: {props.request.date} at {props.request.time}</p>
                        <p>Description: {props.request.description}</p>
                        <p>Justification: {props.request.justification}</p>
                        <p>Cost: ${props.request.cost}</p>
                        <p>Projected Reimbursement: ${props.request.projectedRe}</p>
                        {user.username !== props.request.username && (
                            <div className='requestCard'>
                                <p><button className='submitButton' onClick={approveRequest}>Approve</button>&nbsp;&nbsp;&nbsp;<button className='submitButton' onClick={denyRequest}>Deny</button></p>
                                <p>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></p>
                                <p><button className='submitButton' onClick={goToRequestInfo}>Request More Information</button></p>
                            </div>
                        )}
                    </div>
                </section>
            )}
            {user.role === 'Department Head' && target.supervisor !== user.username && props.request.approval.length === 1 && props.request.appStatus !== 'denied' && (
                <section>
                    <div className='requestCard'>
                        <h3>{props.request.requestID}</h3>
                        <p>Status: {props.request.appStatus}</p>
                        <p>Type and Location: {props.request.type} at {props.request.location}</p>
                        <p>Date and Time: {props.request.date} at {props.request.time}</p>
                        <p>Description: {props.request.description}</p>
                        <p>Justification: {props.request.justification}</p>
                        <p>Cost: ${props.request.cost}</p>
                        <p>Projected Reimbursement: ${props.request.projectedRe}</p>
                        {user.username !== props.request.username && (
                            <div className='requestCard'>
                                <p><button className='submitButton' onClick={approveRequest}>Approve</button>&nbsp;&nbsp;&nbsp;<button className='submitButton' onClick={denyRequest}>Deny</button></p>
                                <p>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></p>
                                <p><button className='submitButton' onClick={goToRequestInfo}>Request More Information</button></p>
                            </div>
                        )}
                    </div>
                </section>
            )}
            {user.role === 'BenCo' && target.supervisor !== user.username && props.request.approval.length === 2 && props.request.appStatus !== 'denied' && (
                <section>
                    <div className='requestCard'>
                        <h3>{props.request.requestID}</h3>
                        <p>Status: {props.request.appStatus}</p>
                        <p>Type and Location: {props.request.type} at {props.request.location}</p>
                        <p>Date and Time: {props.request.date} at {props.request.time}</p>
                        <p>Description: {props.request.description}</p>
                        <p>Justification: {props.request.justification}</p>
                        <p>Cost: ${props.request.cost}</p>
                        <p>Projected Reimbursement: ${props.request.projectedRe}</p>
                        {user.username !== props.request.username &&  props.request.grade === '' && (
                            <div className='requestCard'>
                                <p><button className='submitButton' onClick={approveRequest}>Approve</button>&nbsp;&nbsp;&nbsp;<button className='submitButton' onClick={denyRequest}>Deny</button></p>
                                <p>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></p>
                                <p><button className='submitButton' onClick={goToRequestInfo}>Request More Information</button></p>
                            </div>
                        )}
                    </div>
                </section>
            )}
            {user.username !== props.request.username && props.request.grade !== '' && (
                <div>
                    <p>Grade Recieved: {props.request.grade}</p>
                    <p><button className='btn btn' onClick={approveGrade}>Pass</button>&nbsp;&nbsp;&nbsp;<button className='btn btn' onClick={denyGrade}>Fail</button></p>
                </div>
            )}
            {user.role === 'BenCo' && target.supervisor === user.username && props.request.approval.length === 0 && (
                <section>
                    <div className='requestCard'>
                        <h3>{props.request.requestID}</h3>
                        <p>Status: {props.request.appStatus}</p>
                        <p>Type and Location: {props.request.type} at {props.request.location}</p>
                        <p>Date and Time: {props.request.date} at {props.request.time}</p>
                        <p>Description: {props.request.description}</p>
                        <p>Justification: {props.request.justification}</p>
                        <p>Cost: ${props.request.cost}</p>
                        <p>Projected Reimbursement: ${props.request.projectedRe}</p>
                        {user.username !== props.request.username &&  props.request.grade === '' && (
                            <div className='requestCard'>
                                <p><button className='submitButton' onClick={approveRequest}>Approve</button>&nbsp;&nbsp;&nbsp;<button className='submitButton' onClick={denyRequest}>Deny</button></p>
                                <p>Reason for Denial: <input type='text' className='myFormControl' onChange={handleFormInput} name='notes' /></p>
                                <p><button className='submitButton' onClick={goToRequestInfo}>Request More Information</button></p>
                            </div>
                        )}
                    </div>
                </section>
            )}
            {user.username !== props.request.username && props.request.grade !== '' && (
                <div className='requestCard'>
                    <p>Grade Recieved: {props.request.grade}</p>
                    <p><button className='submitButton' onClick={approveGrade}>Pass</button>&nbsp;&nbsp;&nbsp;<button className='submitButton' onClick={denyGrade}>Fail</button></p>
                </div>
            )}
        </div >
    )
}

export default AdminReqRow;