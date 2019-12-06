import React from 'react';


export default class RegistrationComponent extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className='container'>
                <form action="">
                    <h1>Welcome to <b>DepoEasy</b></h1>
                    <div className="form-group">
                        <label  for='email' ><b>Emial</b></label>
                        <input className='form-control' type='text' placeholder='Enter email' id='email' required/>
                    </div>
                    <div className="form-group">
                        <label for='passwrod'><b>Password</b></label>
                        <input className='form-control' type='password' placeholder='Enter password' id='password' required/>
                    </div>

                    <div className="form-group">
                        <label for='passwrod-repeat'><b>Repeat password:</b></label>
                        <input className='form-control ' type='password' placeholder='Enter password' id='password-repeat' required/>
                    </div>
                    <button type='submit' className='btn btn-dark'>Registred</button>
                </form>
            </div>
        );
    }
};