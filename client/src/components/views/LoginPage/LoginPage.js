import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router';

function LoginPage() {

    const dispatch = useDispatch();
    const navi = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        //console.log('Email: ', email, ' Password: ', password);
        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
        .then(res => {
            if(res.payload.loginSuccess){
                //props.history.push('/');
                navi('/');
            }
            else{
                alert('err');
            }
        });
        
    }

    return (
        <div style={
            {display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}
        }>
            <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={onChangeEmail}/>
                <label>Password</label>
                <input type="password" value={password} onChange={onChangePassword}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
