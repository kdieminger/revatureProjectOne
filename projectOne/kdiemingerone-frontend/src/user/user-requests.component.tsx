import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequests } from '../actions';
import { RequestState, UserState } from '../reducer';
import { AppRequest } from '../request/request';
import ReqRow from '../request/request-row';



function UserRequestsComponent() {
    const reqSelector = (state: RequestState) => state.requests;
    const reqs = useSelector(reqSelector);
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();


    useEffect(() => {
            dispatch(AsyncRequests(user.username));
    }, [dispatch, user.username]);

    // return a render of the reqArrs mapped to Request Components
    return (
        <section>
            <div>
                <h2>Available Reimbursement</h2>
                <p>{user.availableReim}</p>
            </div>
            <h2>Requests for {user.username}:</h2>
            {reqs.map((req: AppRequest, index: number) =>
                <ReqRow key={'req-' + index} request={req}></ReqRow>)}
        </section>
    )
}

export default UserRequestsComponent;