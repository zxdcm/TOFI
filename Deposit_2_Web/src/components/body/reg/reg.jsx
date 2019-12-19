import React from 'react';

import axios  from 'axios';
import { SIGN_UP_URL }  from '../../../constants/API';


export default class RegistrationComponent extends React.Component {
    render(){
        return (
            <div className='container mt-4' onSubmit={event => this.onSubmit(event)}>
                <h1>Добро пожаловать в <b>DepoEasy</b></h1>
                <div className="form-group">
                    <label  htmlFor='login'><b>Логин</b></label>
                    <input className='form-control col-6' type='text' placeholder='Введите ваш логин' id='login' required/>
                </div>
                <div className="form-group">
                    <label  htmlFor='username'><b>Имя</b></label>
                    <input className='form-control col-6' type='text' placeholder='Введите ваше имя' id='username' required/>
                </div>
                <div className="form-group">
                    <label  htmlFor='login'><b>Email</b></label>
                    <input className='form-control col-6' type='text' placeholder='Введите ваш email' id='email' required/>
                </div>
                <div className="form-group">
                    <label htmlFor='passwrod'><b>Пароль</b></label>
                    <input className='form-control col-6' type='password' placeholder='Введите ваш пароль' id='password' required/>
                </div>

                <div className="form-group">
                    <label htmlFor='passwrod-repeat'><b>Повторите пароль</b></label>
                    <input className='form-control col-6' type='password' placeholder='Введите ваш пароль еще раз' id='password-repeat' required/>
                </div>
                <button onClick={event => signUp()} className='btn btn-dark'>Зарегестрировать</button>
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