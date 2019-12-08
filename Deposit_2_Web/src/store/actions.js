export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = currentUser => ({
    type: SET_CURRENT_USER,
    payload: currentUser
});