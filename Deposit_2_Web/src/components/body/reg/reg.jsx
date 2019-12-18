import React from 'react';

import axios  from 'axios';
import { SIGN_UP_URL }  from '../../../constants/API';


export default class RegistrationComponent extends React.Component {
    constructor(props){
        super(props)
    }

    onSubmit(event){
        return document.getElementById('password').value === document.getElementById('password-repeat').value;
    };

    render(){
        return (
            <div className='container' onSubmit={event => this.onSubmit(event)}>
                <h1>Welcome to <b>DepoEasy</b></h1>
                <div className="form-group">
                    <label  htmlFor='login'><b>Login</b></label>
                    <input className='form-control' type='text' placeholder='Enter login' id='login' required/>
                </div>
                <div className="form-group">
                    <label  htmlFor='username'><b>User Name</b></label>
                    <input className='form-control' type='text' placeholder='Enter user name' id='username' required/>
                </div>
                <div className="form-group">
                    <label  htmlFor='login'><b>Email</b></label>
                    <input className='form-control' type='text' placeholder='Enter email' id='email' required/>
                </div>
                <div className="form-group">
                    <label htmlFor='passwrod'><b>Password</b></label>
                    <input className='form-control' type='password' placeholder='Enter password' id='password' required/>
                </div>

                <div className="form-group">
                    <label htmlFor='passwrod-repeat'><b>Repeat password:</b></label>
                    <input className='form-control ' type='password' placeholder='Enter password' id='password-repeat' required/>
                </div>
                <button onClick={event => signUp()} className='btn btn-dark'>Register</button>
            </div>
        );
    }
};

const signUp = () => {
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('password-repeat').value;

    if (password !== repeatPassword){
        alert('Password is not equals');
        return;
    }

    const form = new FormData();
    ['login', 'username', 'email', 'password'].forEach(value => 
        form.set(value, document.getElementById(value).value));

    axios.post(SIGN_UP_URL, form)
        .then(response => response.data.isSuccess 
                ? localStorage.setItem('user', response.data.data)
                : alert(response.data.message))
        .catch(err => alert('Some error'));
};