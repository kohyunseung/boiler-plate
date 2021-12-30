import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function LandingPage() {
    //const [text, setText] = useState();
    // useEffect(() => {
    //     axios.get('/api/hello')
    //     .then(res => setText(res.data))
    // }, [])
    const navi = useNavigate();

    const onClickLogout = (event) => {
        axios.get('/api/users/logout').then(res => {
            if(res.data.success){
                alert('로그아웃 성공');
                navi('/login');
            }
            else{
                alert('실패');
            }
            
        });
    }

    return (
        <div style={
            {display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}
        }>
            Hi
            <button onClick={onClickLogout}>Logout</button>
        </div>
    )
}

export default LandingPage
