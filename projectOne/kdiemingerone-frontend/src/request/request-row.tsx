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

    console.log(props.request);

    // useEffect(() => {
    //     requestService.getRequest(props.request.requestID).then((req) => {
    //         dispatch(changeRequest(req));
    //     })
    // }, [dispatch, props.request.requestID]);

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
    }

    function goToRequestInfo() {
        history.push('/' + request.requestID + '/reqinfo');
    }

    return (
        <div>
            <section className="row border">
                {props.request.appStatus === 'pending' && (
                    <div>
                        <h5>Pending Requests:</h5>
                        <table className="requestsTable">
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
                            </tbody>
                        </table>
                    </div>
                )}
                {props.request.appStatus === 'approved' && (
                    <div>
                        <h5>Accepted Requests:</h5>
                        <table className="requestsTable">
                            <tbody>
                                <tr>
                                    <td>{props.request.requestID}</td>
                                    <td>{props.request.username}</td>
                                    <td>{props.request.type}</td>
                                    <td>{props.request.date}</td>
                                    <td>{props.request.time}</td>
                                    <td>{props.request.location}</td>
                                </tr>
                                {props.request.grade === '' && (
                                    <tr>
                                        <td>Grade: <input type='text' className='myFormControl' onChange={handleFormInput} name='grade' /></td>
                                        <button className='viewButtons' onClick={uploadGrade}>Upload Grade</button>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {props.request.appStatus === 'denied' && (
                    <div>
                        <h5>Denied Requests:</h5>
                        <table className="requestsTable">
                            <tbody>
                                <tr>
                                    <td>{props.request.requestID}</td>
                                    <td>{props.request.username}</td>
                                    <td>{props.request.type}</td>
                                    <td>{props.request.date}</td>
                                    <td>{props.request.time}</td>
                                    <td>{props.request.location}</td>
                                    <td>{props.request.notes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}

export default ReqRow;