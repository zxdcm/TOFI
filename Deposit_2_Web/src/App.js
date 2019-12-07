import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './components/header/header.jsx';
import RegistrationComponent from './components/body/registration/registration.jsx';
import AuthorizationComponent from './components/body/authorization/authorization.jsx';
import HomeComeponent from './components/body/home/home.jsx';
import { SignInUrl, SearchUrl, AuthUrl } from './constants/link';
import { SearchComponent } from './components/body/search/search.jsx';


export default () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Route exact path = '/' component={HomeComeponent} />
        <Route exact path={'/' + SignInUrl} component={RegistrationComponent} />
        <Route exact path={'/' + SearchUrl} component={SearchComponent} />
        <Route exact path={'/' + AuthUrl} component={AuthorizationComponent} />
      </BrowserRouter>
    </div>
  );
}

