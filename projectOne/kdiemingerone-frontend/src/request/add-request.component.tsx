import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RequestState } from '../reducer';
import requestService from './request.service';
import { changeRequest } from '../actions';
import { AppRequest } from './request';
import Form from 'react-bootstrap/Form';

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

function AddRequestComponent( props: PropsFromRedux ) {
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let r: any = { ...props.request };
        r[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateRequest(r);
    }
    function submitForm() {
        requestService.addRequest(props.request).then(() => {
            props.updateRequest(new AppRequest());
            // call the callback function from the parent component so that it will re-render
            history.push('/home');
        });
    }
    return (
        <div>
            <div className='add-form'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name='username'
                    value={(props.request).username}
                    onChange={handleFormInput}
                />
            </div>
            <div className="form-group">
                <p><Form.Label>Event Type</Form.Label></p>
                <Form.Control name='type' onChange={handleFormInput} as="select" custom>
                    <option value=''>--</option>
                    <option value='University Course'>University Course</option>
                    <option value='Seminar'>Seminar</option>
                    <option value='Certification Prep Course'>Certification Prep Course</option>
                    <option value='Certification'>Certification</option>
                    <option value='Technical Training'>Technical Training</option>
                    <option value='Other'>Other</option>
                </Form.Control>
            </div>
            <div className="form-group">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    name='date'
                    value={(props.request).date}
                    onChange={handleFormInput}
                />
            </div>
            <div className="form-group">
                <Form.Label>Time</Form.Label>
                <Form.Control
                    type="time"
                    name='time'
                    value={(props.request).time}
                    onChange={handleFormInput}
                />
            </div>
            <div className="form-group">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    name='location'
                    value={(props.request).location}
                    onChange={handleFormInput}
                />
            </div>
            <div className="form-group">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                    type="number"
                    name='cost'
                    value={(props.request).cost}
                    onChange={handleFormInput}
                />
            </div>
            <div className="form-group">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name='description'
                    value={(props.request).description}
                    onChange={handleFormInput}
                />
            </div>
            <div className="form-group">
                <Form.Label>Justification</Form.Label>
                <Form.Control
                    type="text"
                    name='justification'
                    value={(props.request).justification}
                    onChange={handleFormInput}
                />
            </div>
           <button className='btn btn' onClick={submitForm}>Submit Request</button>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddRequestComponent);
