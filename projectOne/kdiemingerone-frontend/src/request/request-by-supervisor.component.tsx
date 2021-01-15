import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '../reducer';
import { Request } from './request';
import userService from '../user/user.service';
import RequestComponent from './request.component';


function RequestBySupervisorComponent() {
    const reqArrs: any = [];
    const userSelector = (state: UserState) => state.user;
    const supervisor = useSelector(userSelector);
    // const dispatch = useDispatch();
    //use effect to grab the user array
    useEffect(() =>{
        userService.getBySupervisor(supervisor.username).then((arr: string[])=>{
            console.log('arr:'+arr);
            arr.forEach((users)=> userService.getReqByUsers(users).then((req)=>{
                console.log(req);
                req.forEach((ind) => {
                    console.log('ind: '+ind)
                    reqArrs.push(ind);
                })
            }));
        })
        console.log('reqArrs: '+reqArrs); 
    });

    // return a render of the reqArrs mapped to Request Components
    return (
        <section className="row border">
            {reqArrs.map((req: Request, index: number) =>
                <RequestComponent key={'req-' + index} data={req}></RequestComponent>)}
        </section>
    )
}

export default RequestBySupervisorComponent;