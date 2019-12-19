import React from 'react'


export default class UserInfo extends React.Component {


    render(){
        return (
            <div className='container' onSubmit={event => this.onSubmit(event)}>
                <h1>User info</h1>
                <div className="form-group">
                    <label  htmlFor='login'><b>Old password</b></label>
                    <input className='form-control' type='password' placeholder='Enter login' id='login' required/>
                </div>
                <div className="form-group">
                    <label  htmlFor='username'><b>New password</b></label>
                    <input className='form-control' type='password' placeholder='Enter user name' id='username' required/>
                </div>
                <button className='btn btn-dark'>Cgange passwor</button>
                <div className="form-group">
                    <label  htmlFor='login'><b>Email</b></label>
                    <input className='form-control' type='text' placeholder='Enter email' id='email' required/>
                </div>
                <button className='btn btn-dark'>Cgange passwor</button>
            </div>
        );
    }
}