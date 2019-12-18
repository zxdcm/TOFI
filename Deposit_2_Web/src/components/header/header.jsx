import React from 'react';
import { Link } from 'react-router-dom';

import { SignInUrl, SearchUrl, AuthUrl } from '../../constants/link';

import './header.css';

export default props => { 


    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark pl-4 pr-4'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#'>Smart Deposit</a>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to={'/'}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to={'/' + SearchUrl}>Search</Link>
                        </li>
                    </ul>
                    {props.user == null ? (
                    <ul className='navbar-nav'>
                        
                        <li className='nav-item'>
                            <Link className='nav-link' to={'/' + AuthUrl}>SignIn</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to={'/' + SignInUrl}>SignUp</Link>
                        </li>
                    </ul>
                    ) : (
                    <ul className='navbar-nav'>
                    <span className='navbar-text'>
                        Hello {props.user.username}
                    </span>
                        <li className='nav-item'>
                            <button className='btn' onClick={e => {
                                localStorage.clear();
                                props.signOut()
                            }}>SignOut</button>
                        </li>
                    </ul>)}
                    
                </div>
            </div>
        </nav>
    
    );
};