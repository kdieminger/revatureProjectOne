import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RequestState } from '../reducer';
import './request.css';
import requestService from './request.service';
import { changeRequest } from '../actions';
import { Request } from './request';

// This is the prop I want to connect from redux
const requestProp = (state: RequestState) => ({ request: state.request });
// This is the dispatcher I want to use from redux
const mapDispatch = {
    updateRequest: (request: Request) => changeRequest(request),
};
// Put them in the connector
const connector = connect(requestProp, mapDispatch);

// Function Component
// get the types of the props we created above so we can tell our component about them.
type PropsFromRedux = ConnectedProps<typeof connector>;

function AddRequestComponent(props: PropsFromRedux) {
    const FIELDS = ['username', 'type', 'date', 'time', 'location', 'description', 'cost', 'justification'];
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
            props.updateRequest(new Request());
            // call the callback function from the parent component so that it will re-render
            history.push('/');
        });
    }
    return (
        <div className='col request card'>
            {FIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'r_' + fieldName}
                            value={(props.request as any)[fieldName]}
                            onChange={handleFormInput}
                        ></input>
                    </div>
                );
            })}
            <button className='btn btn-primary' onClick={submitForm}>
                Make Request
            </button>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddRequestComponent);
