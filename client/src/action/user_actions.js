import axios from 'axios';
import {
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_LAUNCHED,
    USER_AUTH_ERROR,
    USER_AUTH_SUCCESS,
    USER_AUTH_LAUNCHED,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_ERROR,
    USER_LOGOUT_LAUNCHED,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_REGISTER_LAUNCHED,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_ERROR,
    USER_UPDATE_PROFILE_LAUNCHED
} from '../types';
import {USER_SERVER} from '../services/linksApi';

const loginSucces = () => ({
    type: USER_LOGIN_SUCCESS,
    success: true
}) 

const loginError = (msg) => ({
    type: USER_LOGIN_ERROR,
    success: false,
    message: msg    
})

const loginLaunched = () => ({
    type: USER_LOGIN_LAUNCHED
})

export const login = (dataToSubmit) => async dispatch => {
    dispatch(loginLaunched());
    const { data } = await axios.post(`${USER_SERVER}/login`, dataToSubmit);

    if(data.loginSuccess){ 
        dispatch(loginSucces(data));
    } else {
        dispatch(loginError(data.message));
    }
}

const authSuccess = (data) => ({  
    type: USER_AUTH_SUCCESS,
    userData: data
});

const authError = (data) => ({
    type: USER_AUTH_ERROR,
    userData: data
})

const authLaunched = () => ({
    type: USER_AUTH_LAUNCHED
})

export const auth = () => async (dispatch) => {
    dispatch(authLaunched());
    const { data } = await axios.get(`${USER_SERVER}/auth`);

    if(data){
        dispatch(authSuccess(data));
    } else {
        dispatch(authError(data));
    }
}

const logoutSuccess = () => ({
    type: USER_LOGOUT_SUCCESS
})

const logoutError = () => ({
    type: USER_LOGOUT_ERROR
})

const logoutLaunched = () => ({
    type: USER_LOGOUT_LAUNCHED
})

export const logout = () => async dispatch => {
    dispatch(logoutLaunched());
    const { data } = await axios.get(`${USER_SERVER}/logout`);

    if(data.success){
        dispatch(logoutSuccess());
    } else {
        dispatch(logoutError());
    }
}

const registerSuccess = (data) => ({
    type: USER_REGISTER_SUCCESS,
    success: data.success
})

const registerError = (data) => ({
    type: USER_REGISTER_ERROR,
    success: false,
    message: data.err
})

export const register = (dataToSubmit) => async dispatch => {
    const { data } = await axios.post(`${USER_SERVER}/register`, dataToSubmit);

    if(data.success){
        dispatch(registerSuccess(data));
    } else {
        dispatch(registerError(data));
    }
}

const updateProfileSuccess = () => ({
    type: USER_UPDATE_PROFILE_SUCCESS
})

const updateProfileError = (message) => ({
    type: USER_UPDATE_PROFILE_ERROR,
    errorMessage: message
})

const updateProfileLaunched = () => ({
    type: USER_UPDATE_PROFILE_LAUNCHED
})

export const updateProfile = (dataToSubmit) => async dispatch => {
    dispatch(updateProfileLaunched());
    const { data } = await axios.post(`${USER_SERVER}/update_profile`, dataToSubmit);

    if(data.success){
        dispatch(updateProfileSuccess());
    } else {
        dispatch(updateProfileError(data.err));
    }
}