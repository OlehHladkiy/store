import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGIN_LAUNCHED,
    USER_AUTH_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_AUTH_LAUNCHED,
    USER_LOGOUT_LAUNCHED,
    USER_REGISTER_LAUNCHED,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_ERROR,
    USER_UPDATE_PROFILE_LAUNCHED
} from '../types'

export default function(state = {}, action){
    switch(action.type){
        case USER_REGISTER_SUCCESS:
            return { ...state, registerSuccess: action.success, isFetchingRegister: false}
        case USER_REGISTER_ERROR:
            return { ...state, registerSuccess: action.success, errorMessage: action.err, isFetchingRegister: false}
        case USER_REGISTER_LAUNCHED:
            return { ...state, isFetchingRegister: true}
        case USER_AUTH_SUCCESS:
            return { ...state, userData: action.userData, isFetchingAuth: false };
        case USER_AUTH_LAUNCHED:
            return { ...state, isFetchingAuth: true}
        case USER_LOGIN_LAUNCHED:
            return { ...state, isFetchingLogin: true}
        case USER_LOGIN_SUCCESS:
            return { ...state, loginSuccess: action.success, isFetchingLogin: false };
        case USER_LOGIN_ERROR:
            return { ...state, loginSuccess: action.success, errorMessage: action.message, isFetchingLogin: false };
        case USER_LOGOUT_SUCCESS:
            return { ...state, isFetchingLogout: false, successLogout: true };
        case USER_LOGOUT_LAUNCHED:
            return { ...state, isFetchingLogout: true };
        case USER_UPDATE_PROFILE_LAUNCHED:
            return { ...state, isFetchingUpdateProfile: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { ...state, isFetchingUpdateProfile: false, updateSuccess: true};
        case USER_UPDATE_PROFILE_ERROR:
            return { ...state, isFetchingUpdateProfile: false, updateSuccess: false, errorMessage: action.errorMessage }
        default:
            return state;
    }
}