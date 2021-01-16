import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../reducer';
import userService from './user.service';
import { User } from './user';
import UserRow from './user-row.component';
import { getUsers } from '../actions';


function UsersBySupervisorComponent() {
    const usersSelector = (state: UserState) => state.users;
    const users = useSelector(usersSelector);
    const userSelector = (state: UserState) => state.user;
    const supervisor = useSelector(userSelector);
    const dispatch = useDispatch();

    //use effect to grab the user array
    useEffect(() => {
        userService.getBySupervisor(supervisor.username).then((arr) => {
            dispatch(getUsers(arr));
        })
    }, []);

    // return a render of the reqArrs mapped to Request Components
    return (
        <section>
            <div>
                <p>Hello {supervisor.username}</p>
            </div>
            {users.map((ind: User, index: number) =>
                <UserRow key={'ind-' + index} user={ind}></UserRow>)}
        </section>
    )
}

export default UsersBySupervisorComponent;