import { USER_DETAILED_FAIL, USER_DETAILED_REQUEST, USER_DETAILED_RESET, USER_DETAILED_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../Constants/UserConstant";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
};
////register
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
};

////GET pROFILE
export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILED_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILED_SUCCESS:
            return { ...state, loading: false, userProfile: action.payload };
        case USER_DETAILED_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case USER_DETAILED_RESET:
            return {}
        default:
            return state;
    }
};

////GET pROFILE
export const userUpdatedReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { ...state, loading: true };
        case USER_UPDATE_SUCCESS:
            return { ...state, loading: false, success: true, updatedProfile: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, success: false, error: action.payload }
        default:
            return state;
    }
};


