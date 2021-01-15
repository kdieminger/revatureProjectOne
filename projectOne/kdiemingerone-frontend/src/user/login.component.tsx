import { SyntheticEvent } from 'react';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions';
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
        dispatch(getUser(u));
    }
    function submitForm() {
        userService.login(user).then((target) => {
            dispatch(getUser(target));
            history.push('/users/'+target.username);
        });
    }
    return (
        
        <div className='LoginCard'>
           Username <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
           <br/>
           Password <input type='password' className='form-control' onChange={handleFormInput} name='password'/>
           <br/>
           <button className='btn btn' onClick={submitForm}>Login</button>
        </div>
    );
}

export default LoginComponent;
