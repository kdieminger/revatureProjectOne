import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequests } from '../actions';
import { RequestState, UserState } from '../reducer';
import { AppRequest } from '../request/request';
import ReqRow from '../request/request-row';



function SupReqComponent() {
    const reqSelector = (state: RequestState) => state.requests;
    const reqs = useSelector(reqSelector);
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const targetSelector = (state: UserState) => state.targetUser;
    const target = useSelector(targetSelector);
    const dispatch = useDispatch();
    
    //use effect to grab the user array
    useEffect(() => {
        dispatch(AsyncRequests(target.username));
    }, [reqs.length])
    console.log(reqs);

    // return a render of the reqArrs mapped to Request Components
    return (
        <section>
            {reqs.map((req: AppRequest, index: number) =>
                <ReqRow key={'req-' + index} request={req}></ReqRow>)}
        </section>
    )
}

export default SupReqComponent;