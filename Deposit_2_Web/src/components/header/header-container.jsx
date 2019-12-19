import React from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

import Header from './header.jsx';
import { setCurrentUser } from '../../store/actions';

class HeaderContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    render(){

        return (
            <Header user={this.state.user} signOut={() => this.setState({user: null})}/>
        );
    }

    componentDidMount(){        
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');

        if (username && userId){
            this.setState({ user: {username, userId}});
        }
    }
}


const mapStateToProps = state => {
    return {
        user: state.currentUser.user
    };
};


export default connect(mapStateToProps)(HeaderContainer);