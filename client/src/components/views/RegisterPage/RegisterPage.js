import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router';

function RegisterPage() {
    const dispatch = useDispatch();
    const navi = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onChangePasswordConfirm = (event) => {
        setPasswordConfirm(event.currentTarget.value);
    }

    const onChangeName = (event) => {
        setName(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        //console.log('Email: ', email, ' Password: ', password);
        if(password !== passwordConfirm){
            return alert('비밀번호가 다릅니다.');
        }

        let body = {
            email: email,
            name: name,
            password: password,
            passwordConfirm: passwordConfirm
        }

        dispatch(registerUser(body))
        .then(res => {
            if(res.payload.success){
                //props.history.push('/');
                navi('/login');
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
                <label>Name</label>
                <input type="text" value={name} onChange={onChangeName}/>
                <label>Password</label>
                <input type="password" value={password} onChange={onChangePassword}/>
                <label>Password Confirm</label>
                <input type="password" value={passwordConfirm} onChange={onChangePasswordConfirm}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default RegisterPage
