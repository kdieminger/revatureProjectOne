import { SyntheticEvent } from 'react';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../actions';
import './login.css';

// Function Component
function LoginComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'username'){
            u.name = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(GetUser(u));
    }
    function submitForm() {
        userService.login(user).then((target) => {
            dispatch(GetUser(target));
            history.push('/home');
        });
    }
    return (
        
        <div className='LoginCard'>
            <br/>
           <div className = 'label'>Username</div> <input type='text' className='myFormControl' onChange={handleFormInput} name='username'/>
           <br/><br/>
           <div className='label'>Password</div> <input type='password' className='myFormControl' onChange={handleFormInput} name='password'/>
           <br/> <br/>
           <button className='myButton' onClick={submitForm}>Login</button>
           <br/>
        </div>
    );
}

export default LoginComponent;
