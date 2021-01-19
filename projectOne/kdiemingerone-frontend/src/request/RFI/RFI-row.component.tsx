import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRFIs } from '../../actions';
import { RequestState, UserState } from '../../reducer';
import { RFI } from '../../request/request';
import SimpleRFIComponent from './RFI-simple.component';



function RFIRow() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const RFISelector = (state: RequestState) => state.RFIs;
    const RFIs = useSelector(RFISelector);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(AsyncRFIs(user.username));
    }, [dispatch, user.username]);

    return (
        <section>
            <div>
                <p>Feature Coming Soon!</p>
                {/* <h3>Requests for Information</h3> */}
            </div>
            {/* {RFIs.map((req: RFI, index: number) =>
                <SimpleRFIComponent key={'req-' + index} ref={req}></SimpleRFIComponent>)} */}
        </section>
    )
}

export default RFIRow;