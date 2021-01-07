import React, { SyntheticEvent } from 'react';
import { User } from './user';
import userService from './user.service';
import UserContext from '../user.context';
import { useHistory } from 'react-router-dom';

// Function Component
function LoginComponent(props: any) {
    const [userInfo, setUserInfo] = React.useState(new User());
    const [userContext, setUserContext] = React.useContext(UserContext)
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...userInfo };
        if((e.target as HTMLInputElement).name === 'username'){
            u.name = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        setUserInfo(u);
    }
    function submitForm() {
        userService.login(userInfo).then((user) => {
            setUserContext(user);
            history.push('/restaurants');
        });
    }

    return (
        <div className='col restaurant card'>
           Username <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
           <br/>
           Password <input type='password' className='form-control' onChange={handleFormInput} name='password'/>
           <br/>
           <button className='btn btn-danger' onClick={submitForm}>Login</button>
        </div>
    );
}

export default LoginComponent;
