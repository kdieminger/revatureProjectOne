import { AppRequest } from '../request';
import { Form } from 'react-bootstrap';
import { SyntheticEvent, useEffect } from 'react';
import { changeRequest, changeTarget } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import requestService from '../request.service';
import { RequestState, UserState } from '../../reducer';
import { useHistory } from 'react-router-dom';
import userService from '../../user/user.service';


export function RFIComponent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const reqSelector = (state: RequestState) => state.request;
    const request = useSelector(reqSelector);
    const targetSelector = (state: UserState) => state.targetUser;
    const target = useSelector(targetSelector);
    const RFISelector = (state: RequestState) => state.rfi;
    const rfi = useSelector(RFISelector);

    useEffect(() => {
        userService.getUser(rfi.from).then((from) => {
            dispatch(changeTarget(from));
        })
        requestService.getRequest(rfi.reqID).then((req) => {
            dispatch(changeRequest(req));
        })
    }, [dispatch, rfi.from]);

    function handleFormInput(e: SyntheticEvent) {
        if ((e.target as HTMLInputElement).name === 'answer') {
            request.reqFI.answer = (e.target as HTMLInputElement).value;
            requestService.updateRequest(request);
        }
    }

    function submitForm() {
        user.numRFI--;
        target.numRFI++;
        userService.updateUser(user).then(() => { });
        userService.updateUser(target).then(() => { });
        request.reqFI.user = target.username;
        request.reqFI.from = user.username;
        requestService.updateRequest(request).then(() => {
            dispatch(changeRequest(new AppRequest()));
            history.push('/home');
        });
    }

    return (
        <div>
            <div>
                {rfi.answer !== '' && (
                    <div className='detailText'>
                        <br /><br />
                        <h4>From: {rfi.from}</h4><br />
                        <h4>Message: {rfi.question}</h4>
                        <h4>Response: {rfi.answer}</h4>
                    </div>
                )}
                {rfi.answer === '' && (
                    <div className='detailText'>
                        <div>
                            <br /><br />
                            <h4>From: {rfi.from}</h4><br />
                            <h4>Message: {rfi.question}</h4>
                            <Form className='add-form'>
                                <Form.Label>Response:</Form.Label>
                                <Form.Control className='input'
                                    type="text"
                                    name="answer"
                                    onChange={handleFormInput}
                                />
                            </Form><br />
                        </div>
                        <button className='viewButtons' onClick={submitForm}>Submit Response</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RFIComponent;
