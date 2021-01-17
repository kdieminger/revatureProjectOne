import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequests } from '../actions';
import { RequestState, UserState } from '../reducer';
import { AppRequest } from './request';
import ReqRow from './request-row';



function AdminReqComponent() {
    const reqSelector = (state: RequestState) => state.requests;
    const reqs = useSelector(reqSelector);
    const targetSelector = (state: UserState) => state.targetUser;
    const target = useSelector(targetSelector);
    const dispatch = useDispatch();

    //use effect to grab the user array
    useEffect(() => {
        dispatch(AsyncRequests(target.username));
    }, [reqs.length])

    // return a render of the reqArrs mapped to Request Components
    return (
        <section>
            {reqs.map((req: AppRequest, index: number) =>
                <ReqRow key={'req-' + index} request={req}></ReqRow>)}
        </section>
    )
}

export default AdminReqComponent;