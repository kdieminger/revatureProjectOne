import { SyntheticEvent, useEffect } from "react";
import { Form } from "react-bootstrap";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeRequest } from "../actions";
import { RequestState, UserState } from "../reducer";
import userService from "../user/user.service";
import { AppRequest } from "./request";
import requestService from "./request.service";

// This is the prop I want to connect from redux
const requestProp = (state: RequestState) => ({ request: state.request });
// This is the dispatcher I want to use from redux
const mapDispatch = {
    updateRequest: (request: AppRequest) => changeRequest(request),
};
// Put them in the connector
const connector = connect(requestProp, mapDispatch);


// Function Component
// get the types of the props we created above so we can tell our component about them.
type PropsFromRedux = ConnectedProps<typeof connector>;


export function NewRFIComponent( props: PropsFromRedux) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const requestSelector = (state: RequestState) => state.request;
    const request = useSelector(requestSelector);

    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...props.request };
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateRequest(r);
    }

    function submitForm(){
        props.request.reqFI.from = user.username;
        props.request.reqFI.user = props.request.username;
        userService.getUser(props.request.username).then((user) => {
            user.numRFI++;
            userService.updateUser(user).then(() => {});
        })
        requestService.updateRequest(request).then(() => {
            dispatch(changeRequest(new AppRequest()));
            history.push('/home');
        })
    }

    return (
        <div>
            <div className='form'>
                <Form.Label>Message:</Form.Label>
                <Form.Control 
                    type="text"
                    name="question"
                    value={props.request.reqFI.question}
                    onChange={handleFormInput}
                />
            </div>
            <button className='myButton' onClick={submitForm}>Submit RFI</button>
        </div>
    )
}