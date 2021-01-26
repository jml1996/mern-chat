import axios from 'axios';

export const SET_CURRENT_USERNAME = "SET_CURRENT_USERNAME";

export const setCurrentUsername = (currentUsernameLocalStorage) => {
    return {type:SET_CURRENT_USERNAME, payload:currentUsernameLocalStorage};
}