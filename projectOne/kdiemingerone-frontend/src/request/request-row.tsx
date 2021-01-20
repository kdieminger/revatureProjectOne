import { AppRequest } from './request';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState } from '../reducer';
import { useHistory } from 'react-router-dom';
// import requestService from './request.service';
// import { changeRequest } from '../actions';
// import { useEffect } from 'react';
import './requests.css';
import { SyntheticEvent } from 'react';
import { changeRequest } from '../actions';
import requestService from './request.service';

type PropType = { request: AppRequest };


function ReqRow(props: PropType) {
    const history = useHistory();
    const dispatch = useDispatch();
    const requestSelector = (state: RequestState) => state.request;
    const request = useSelector(requestSelector);

    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...props.request };
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeRequest(r));
    }

    function uploadGrade() {
        request.approval.splice(2, 1);
        request.appStatus = 'pending';
        requestService.updateRequest(request);
        history.push('/home');
    }

    function goToRequestInfo() {
        history.push('/' + request.requestID + '/reqinfo');
    }

    return (
        <section>
            {props.request.appStatus !== 'approved' && (
                <div className='requestCard'>
                    <h3>{props.request.requestID}</h3>
                    <p>Status: {props.request.appStatus}</p>
                    <p>Type: {props.request.type}</p>
                    <p>Date: {props.request.date}</p>
                    <p>Time: {props.request.time}</p>
                    <p>Location: {props.request.location}</p>
                    <p>Cost: ${props.request.cost}</p>
                    <p>Projected Reimbursement: ${props.request.projectedRe}</p>
                </div>
            )}
            {props.request.appStatus === 'approved' && (
                <div className='requestCard'>
                    <h3>{props.request.requestID}</h3>
                    <p>Status: {props.request.appStatus}</p>
                    <p>Type: {props.request.type}</p>
                    <p>Date: {props.request.date}</p>
                    <p>Time: {props.request.time}</p>
                    <p>Location: {props.request.location}</p>
                    <p>Cost: ${props.request.cost}</p>
                    <p>Projected Reimbursement: ${props.request.projectedRe}</p>
                    {props.request.grade === '' && (
                        <div className='requestCard'>
                            <p>Grade: <input type='text' className='myFormControl' onChange={handleFormInput} name='grade' /></p>
                            <button className='submitButton' onClick={uploadGrade}>Upload Grade</button>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default ReqRow;