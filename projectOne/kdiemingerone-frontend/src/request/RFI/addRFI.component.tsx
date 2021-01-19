import { SyntheticEvent, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeRequest, changeTarget } from "../../actions";
import { RequestState, UserState } from "../../reducer";
import userService from "../../user/user.service";
import { AppRequest } from "../request";
import requestService from "../request.service";


function AddRFIComponent() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const reqSelector = (state: RequestState) => state.request;
    const request = useSelector(reqSelector);
    const targetSelector = (state: UserState) => state.targetUser;
    const target = useSelector(targetSelector);

    function handleFormInput(e: SyntheticEvent) {
        if((e.target as HTMLInputElement).name === 'question') {
            request.reqFI.question = (e.target as HTMLInputElement).value;
            requestService.updateRequest(request);
        }
    }

    function submitForm(){
        request.reqFI.from = user.username;
        request.reqFI.user = request.username;
        userService.getUser(request.username).then((person) => {
            dispatch(changeTarget(person));
            target.numRFI++;
            userService.updateUser(target).then(() => {
            });
        })
        requestService.updateRequest(request).then(() => {
            dispatch(changeRequest(new AppRequest()));
            history.push('/home');
        })
    }

    return (
        <div>
            <Form.Label>Message</Form.Label>
            <Form.Control
                type="text"
                name='question'
                onChange={handleFormInput}
            />
            <br/><br/>
            <button className='viewButtons' onClick={submitForm}>Submit RFI</button>
        </div>
    )
}

export default AddRFIComponent;