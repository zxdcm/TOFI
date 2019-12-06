import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './components/header/header.jsx';
import RegistrationComponent from './components/body/registration/registration.jsx'
import { SignInUrl, SearchUrl } from './constants/link';
import { SearchComponent } from './components/body/search/search.jsx';

export default () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Route exact path={'/' + SignInUrl} component={RegistrationComponent} />
        <Route exact path={'/' + SearchUrl} component={SearchComponent} />
      </BrowserRouter>
    </div>
  );
}

