import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../reducer';
import userService from './user.service';
import { User } from './user';
import UserRow from './user-row.component';
import { changeUsers } from '../actions';


function AllUsersComponent() {
    const usersSelector = (state: UserState) => state.users;
    const users = useSelector(usersSelector);
    const userSelector = (state: UserState) => state.user;
    const benCo = useSelector(userSelector);
    const dispatch = useDispatch();

    //use effect to grab the user array
    useEffect(() => {
        console.log(users);
        userService.getUsers().then((userArr) => {
            console.log(userArr);
            dispatch(changeUsers(userArr));
        })
    }, [dispatch,users]);

    // return a render of the reqArrs mapped to Request Components
    return (
        <section>
            <div>
                <p>Hello {benCo.username}!</p>
            </div>
            {users.map((ind: User, index: number) =>
                <UserRow key={'ind-' + index} user={ind}></UserRow>)}
        </section>
    )
}

export default AllUsersComponent;