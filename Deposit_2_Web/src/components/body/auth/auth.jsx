import React from 'react';
import axios from 'axios';

import { SIGN_IN_URL, RESTORE_PASSWORD_URL } from '../../../constants/API';
import { Modal } from 'react-bootstrap'; 

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
                window.location.href = "http://localhost:3000";
            } else {
                alert(response.data.error);
            }
        })
        .catch(err => console.log(err));
};

const resotrePassword = () => {
    const email = document.getElementById('send-pswd-email').value;

    axios.put(RESTORE_PASSWORD_URL, {Email: email})
        .then(response => response.data.isSuccess ? alert('Пароль успешно отправлен') : alert('Пароль не был отправлен, проверьте email'))
        .catch(err => alert('Ошибка'))
}

export default class AuthComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false
        }
    }

    render() {
        return (
            <div className='container mt-4'>
                <h1>С возвращением в <b>Smart Deposit</b></h1>
                <div className='form-group'>
                    <label htmlFor='log-in-email'><b>Email</b></label>
                    <input className='form-control col-6' type='text' placeholder='Введите ваш email' id='log-in-email' required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='pass-in-email'><b>Пароль</b></label>
                    <input className='form-control col-6' type='text' placeholder='Введите ваш пароль' id='pass-in-email' required/>
                </div>
                <button className='btn btn-dark' onClick={event => signIn(this.props.setCurrentUser)}>Войти</button>
                <button className='btn btn-dark' onClick={event => this.setState({modalIsOpen: true})}>Забыл пароль</button>
                
                <Modal show={this.state.modalIsOpen} onHide={event => this.setState({modalIsOpen: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Восстановление пароля</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor='send-pswd-email'><b>Email</b></label>
                            <input className='form-control col-12' type='text' placeholder='Введите ваш email' id='send-pswd-email' required/>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-dark" onClick={() => resotrePassword()}>Отправить новый пароль</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};