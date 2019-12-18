import {setCurrentUser, SET_CURRENT_USER} from './actions';

const defaultState = {
    user: null
};

export const currentUserReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
                  
            return {
                user: action.payload
            };
        default:
            return state
    }
};

