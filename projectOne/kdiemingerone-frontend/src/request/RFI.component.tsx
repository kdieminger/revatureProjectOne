import './request.css';
import { AppRequest } from './request';
import { Form } from 'react-bootstrap';
import { SyntheticEvent, useEffect } from 'react';
import { changeRequest, changeTarget } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import requestService from './request.service';
import { UserState } from '../reducer';
import { useHistory } from 'react-router-dom';
import userService from '../user/user.service';

interface RequestProps {
    data: AppRequest;
}

export function RFIComponent(props: RequestProps) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const targetSelector = (state: UserState) => state.targetUser;
    const target = useSelector(targetSelector);

    useEffect(() => {
        userService.getUser(props.data.reqFI.from).then((from) => {
            dispatch(changeTarget(from));
        })
    })

    function handleFormInput(e: SyntheticEvent){
        let r: any = {...props.data};
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeRequest(r))
    }

    function submitForm() {
        user.numRFI--;
        target.numRFI++;
        userService.updateUser(user).then(() => {});
        userService.updateUser(target).then(() => {});
        props.data.reqFI.user = target.username;
        props.data.reqFI.from = user.username;
        requestService.updateRequest(props.data).then(() => {
            dispatch(changeRequest(new AppRequest()));
            history.push('/home');
        });
    }

    return (
        <div>
            <h4>From: {props.data.reqFI.from}</h4>
            <h4>Message:</h4>
            <p>{props.data.reqFI.question}</p>
            <Form className='add-form'>
                <Form.Label>Response:</Form.Label>
                <Form.Control
                    type="text"
                    name="answer"
                    value={props.data.reqFI.answer}
                    onChange={handleFormInput}
                />
            </Form>
            <button onClick={submitForm}>Submit Response</button>
        </div>
    );
}

export default RFIComponent;
