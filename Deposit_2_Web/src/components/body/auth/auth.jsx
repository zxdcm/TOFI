import React from 'react';
import axios from 'axios';

import { SIGN_IN_URL } from '../../../constants/API';

const signIn = setCurrentUser => {
    const login = document.getElementById('log-in-email').value;
    const password = document.getElementById('pass-in-email').value;

    const form = new FormData();
    form.set('Login', login);
    form.set('Password', password);

    axios.post(SIGN_IN_URL, form)
        .then(response => {         
            if (response.data.isSuccess){             
                localStorage.setItem('username', response.data.data.username);
                localStorage.setItem('userId', response.data.data.userId);
                window.location.reload();
            } else {
                alert(response.data.error);
            }
        })
        .catch(err => console.log(err));
};


export default class AuthComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <h1>Welcome back <b>DepoEasy</b></h1>
                <div className='form-group'>
                    <label htmlFor='log-in-email'><b>Email</b></label>
                    <input className='form-control' type='text' placeholder='Enter email' id='log-in-email' required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='pass-in-email'><b>Password</b></label>
                    <input className='form-control' type='text' placeholder='Enter password' id='pass-in-email' required/>
                </div>
                <button className='btn btn-dark' onClick={event => signIn(this.props.setCurrentUser)}>Log in</button>
            </div>
        );
    }
};