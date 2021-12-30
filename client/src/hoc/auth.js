import axios from 'axios';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router';

export default function (SpecificComponent, option, adminRoute = null){
    function AuthenticalCheck(){
        const dispatch = useDispatch();
        const navi = useNavigate();

        useEffect(() =>{
            dispatch(auth()).then(res => {
                // not login
                if(!res.payload.isAuth){
                    if(option){
                        navi('/login');
                    }
                }
                // login
                else{
                    // 관리자만 접속 가능한 곳
                    if(adminRoute && res.payload.isAdmin){
                        navi('/');
                    }
                    else{
                        if(!option){
                            navi('/');
                        }
                    }
                }
            })
        }, []);

        return(
            <SpecificComponent/>
        )    
    }

    

    return AuthenticalCheck;
}