import {createStore, combineReducers } from 'redux';

import {currentUserReducer} from './reducers';

const root = combineReducers({
    currentUser: currentUserReducer
});

export const store = createStore(root);
