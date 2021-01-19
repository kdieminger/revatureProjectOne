import { AppRequest } from './request';
import { useDispatch, useSelector } from 'react-redux';
import { RequestState } from '../reducer';
import { useHistory } from 'react-router-dom';
// import requestService from './request.service';
// import { changeRequest } from '../actions';
// import { useEffect } from 'react';
import './requests.css';

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

    function goToRequestInfo() {
        history.push('/' + request.requestID + '/reqinfo');
    }

    return (
        <div>
            <section className="row border">
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
            </section>
        </div>
    )}

export default ReqRow;