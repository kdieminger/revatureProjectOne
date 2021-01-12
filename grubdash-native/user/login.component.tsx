import React from 'react';
import userService from './user.service';
//import { useHistory } from 'react-router-dom';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';

// Function Component
function LoginComponent() {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const actualUser = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();
    //const history = useHistory();

    function submitForm() {
        userService.login(user).then((user) => {
            console.log(user);
            dispatch(getUser(user));
            //history.push('/restaurants');
        });
    }
    return (
        <View>
            <Text>Username: </Text>
            <TextInput
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, name: value }))
                }
                value={user.name}
            />
            <Text>Password: </Text>
            <TextInput
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, password: value }))
                }
                value={user.password}
            />
            <Button onPress={submitForm} title='Login' color='#880022' />
            <Text>{JSON.stringify(actualUser)}</Text>
        </View>
    );
}

export default LoginComponent;
