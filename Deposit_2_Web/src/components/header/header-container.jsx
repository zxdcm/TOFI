import React from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

import Header from './header.jsx';

class HeaderContainer extends React.Component {

    render(){
        return (
            <Header  user={this.props.user}/>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.currentUser.user
    };
};


export default connect(mapStateToProps)(HeaderContainer);