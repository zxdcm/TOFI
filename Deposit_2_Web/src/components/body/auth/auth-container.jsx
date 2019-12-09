import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


import Authorization from './auth.jsx';
import { setCurrentUser } from '../../../store/actions';


class AuthorizationContainer extends React.Component {

    render() {
        return <Authorization setCurrentUser={setCurrentUser} />
    }
}

const mapDisptachToProps = {
    setCurrentUser
};

export default connect(null, mapDisptachToProps)(AuthorizationContainer);