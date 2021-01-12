import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../reducer';
import './request.css';
import { Request } from './request';
import userService from '../user/user.service';
import './request.css';

interface RequestProps {
    data: Request;
}

function RequestBySupervisorComponent(){
    const reqArrs: any = [];
    const userSelector = (state: UserState) => state.user;
    const supervisor = useSelector(userSelector);
    const dispatch = useDispatch();
    //use effect to grab the user array
    useEffect(() =>{
        userService.getBySupervisor(supervisor.username).then((arr)=>{
            arr.forEach((users)=> userService.getReqByUsers(users).then((req)=>{
                reqArrs.push(req);
            }))
        })
    })
    // return a render of the reqArrs mapped to Request Components
    return {
               
    }
}

export default RequestBySupervisorComponent;