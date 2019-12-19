import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/header/header-container.jsx';
import RegistrationComponent from './components/body/reg/reg.jsx';
import AuthorizationComponent from './components/body/auth/auth-container.jsx';
import HomeComeponent from './components/body/home/home.jsx';
import SettingComponent from './components/body/info/info.jsx';
import { SignInUrl, SearchUrl, AuthUrl, SettingUrl } from './constants/link';
import { SearchComponent } from './components/body/search/search.jsx';
import { store } from './store/index'; 

export default () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <Route exact path='/' component={HomeComeponent} />
          <Route exact path={'/' + SignInUrl} component={RegistrationComponent} />
          <Route exact path={'/' + SearchUrl} component={SearchComponent} />
          <Route exact path={'/' + AuthUrl} component={AuthorizationComponent} />
          <Route exact path={'/' + SettingUrl} component={SettingComponent} />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

