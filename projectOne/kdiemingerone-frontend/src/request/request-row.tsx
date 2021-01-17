import { AppRequest } from './request';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState, UserState } from '../reducer';
import { useHistory } from 'react-router-dom';
import requestService from './request.service';
import { changeRequest, changeUser } from '../actions';
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
        userService.getUser(props.request.username).then((person) => {
            dispatch(changeUser(person));
        })
    },[])

    console.log(props.request.appStatus);

    function approveRequest() {
        dispatch(changeRequest(props.request));
        props.request.approval.push(true);
        if(user.role === 'Department Head' && target.supervisor === user.username){
            props.request.approval.push(true,true);
        }
        else if(user.role === 'BenCo'){
            if(target.supervisor === user.username){
                props.request.approval.push(true,true,true);
            }
            props.request.appStatus = 'approved';
            target.availableReim = target.availableReim - props.request.projectedRe;
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
        dispatch(changeRequest(props.request));
        requestService.updateRequest(request).then(() => {
            console.log('updating request');
            history.push('/home')
        })
    }

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
                        <td>{props.request.appStatus}</td>
                    </tr>
                    {user.role !== 'Employee' && user.username !== props.request.username && (
                        <tr>
                            <td><button className='btn btn' onClick={approveRequest}>Approve</button></td>
                            <td><button className='btn btn' onClick={denyRequest}>Deny</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default ReqRow;