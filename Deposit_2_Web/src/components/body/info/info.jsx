import React from 'react'
import axios from 'axios'

import { EDIT_PASSWORD, EDIT_EMAIL } from '../../../constants/API';

const updateValue = (url, key, value) => {
    const vm = {password: document.getElementById('old-password').value}
    vm[key] = document.getElementById(value).value;

    const id = localStorage.getItem('userId');

    axios.put(url + '/' + id, vm)
        .then(repsonce => console.log(repsonce))
        .catch(err => console.log(err));
} 

export default class UserInfo extends React.Component {
    render(){
        return (
            <div className='container'>
                <h1>User info</h1>
                <div className="form-group">
                    <label  htmlFor='login'><b>Old password</b></label>
                    <input className='form-control' type='password' placeholder='Enter old password' id='old-password' required/>
                </div>
                <div className="form-group">
                    <label  htmlFor='username'><b>New password</b></label>
                    <input className='form-control' type='password' placeholder='Enter new password' id='new-password' required/>
                </div>
                <button className='btn btn-dark' onClick={() => updateValue(EDIT_PASSWORD, 'newPassword', 'new-password')}>Change password</button>
                <div className="form-group">
                    <label  htmlFor='login'><b>Email</b></label>
                    <input className='form-control' type='text' placeholder='Enter email' id='new-email' required/>
                </div>
                <button className='btn btn-dark' onClick={() => updateValue(EDIT_EMAIL, 'email', 'new-email')}>Change email</button>
            </div>
        );
    }
}