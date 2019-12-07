import React from 'react';

export default class AuthorizationComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <form action="">
                    <h1>Welcome back <b>DepoEasy</b></h1>
                    <div className='form-group'>
                        <label htmlFor='log-in-email'><b>Email</b></label>
                        <input className='form-control' type='text' placeholder='Enter email' id='log-in-email' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pass-in-email'><b>Password</b></label>
                        <input className='form-control' type='text' placeholder='Enter password' id='pass-in-email' required/>
                    </div>
                    <button type='submit' className='btn btn-dark'>Log in</button>
                </form>
            </div>
        );
    }
};