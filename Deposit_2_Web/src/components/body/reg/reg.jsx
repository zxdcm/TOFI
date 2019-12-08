import React from 'react';

import axios  from 'axios';
import { SIGN_IN_URL }  from '../../../constants/API';


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
                <form action={SIGN_IN_URL} method='POST'>
                    <h1>Welcome to <b>DepoEasy</b></h1>
                    <div className="form-group">
                        <label  htmlFor='username'><b>User Name</b></label>
                        <input className='form-control' type='text' placeholder='Enter user name' id='username' required/>
                    </div>
                    <div className="form-group">
                        <label  htmlFor='login'><b>Email</b></label>
                        <input className='form-control' type='text' placeholder='Enter email' id='loggin' required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='passwrod'><b>Password</b></label>
                        <input className='form-control' type='password' placeholder='Enter password' id='password' required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor='passwrod-repeat'><b>Repeat password:</b></label>
                        <input className='form-control ' type='password' placeholder='Enter password' id='password-repeat' required/>
                    </div>
                    <button type='submit' className='btn btn-dark'>Register</button>
                </form>
            </div>
        );
    }
};