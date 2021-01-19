import '../request.css';
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
    let RFI = request.reqFI;

    useEffect(() => {
        console.log(RFI.from);
        userService.getUser(RFI.from).then((from) => {
            dispatch(changeTarget(from));
        })
    }, [dispatch, RFI.from]);

    function handleFormInput(e: SyntheticEvent){
        if((e.target as HTMLInputElement).name === 'answer') {
            request.reqFI.answer = (e.target as HTMLInputElement).value;
            requestService.updateRequest(request);
            console.log(request);   
        }
    }

    function submitForm() {
        user.numRFI--;
        target.numRFI++;
        userService.updateUser(user).then(() => {});
        userService.updateUser(target).then(() => {});
        request.reqFI.user = target.username;
        request.reqFI.from = user.username;
        requestService.updateRequest(request).then(() => {
            dispatch(changeRequest(new AppRequest()));
            history.push('/home');
        });
    }

    return (
        <div>
            <h4>From: {request.reqFI.from}</h4>
            <h4>Message:</h4>
            <p>{request.reqFI.question}</p>
            <Form className='add-form'>
                <Form.Label>Response:</Form.Label>
                <Form.Control
                    type="text"
                    name="answer"
                    onChange={handleFormInput}
                />
            </Form>
            <button onClick={submitForm}>Submit Response</button>
        </div>
    );
}

export default RFIComponent;
