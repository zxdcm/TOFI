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
                <h1>Настройки пользователя</h1>
                <div className="form-group">
                    <label  htmlFor='login'><b>Пароль</b></label>
                    <input className='form-control' type='password' placeholder='Введите пароль' id='old-password' required/>
                </div>
                <div className="form-group">
                    <label  htmlFor='username'><b>Новый пароль</b></label>
                    <input className='form-control' type='password' placeholder='Введите новый пароль' id='new-password' required/>
                </div>
                <div className="form-group">
                    <button className='btn btn-dark col-2' onClick={() => updateValue(EDIT_PASSWORD, 'newPassword', 'new-password')}>Change password</button>
                </div>
                <div className="form-group mt-4">
                    <label  htmlFor='login'><b>Новый email</b></label>
                    <input className='form-control' type='text' placeholder='Enter email' id='Введите новый email' required/>
                </div>
                <div className="form-group">
                    <button className='btn btn-dark col-2' onClick={() => updateValue(EDIT_EMAIL, 'email', 'new-email')}>Change email</button>
                </div>
            </div>
        );
    }
}