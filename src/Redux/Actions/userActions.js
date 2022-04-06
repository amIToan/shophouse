import { USER_DETAILED_FAIL, USER_DETAILED_REQUEST, USER_DETAILED_RESET, USER_DETAILED_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../Constants/UserConstant";
import { publicRequest, userRequest } from "../../requestMethods";
import { ORDER_LIST_MY_RESET } from "../Constants/OrderConstants";
export const LoginActions = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        const { data } = await publicRequest.post(`/users/login`, { email, password }, config);
        console.log(data)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
///logout
export const logoutAction = () => (dispatch) => {
    console.log(dispatch)
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILED_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    localStorage.removeItem("userInfo");
    localStorage.clear()
    document.location.href = "/login"
}

//Register
export const RegisterActions = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        const { data } = await publicRequest.post(`/users/`, { name, email, password }, config);
        console.log(data)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//PROFILE
export const getDetailProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILED_REQUEST,
        });
        // const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        const { data } = await userRequest.get(`/users/profile`, config);
        console.log(data)
        dispatch({ type: USER_DETAILED_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

/// update
//PROFILE
export const updatedProfile = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });
        // const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        const { data } = await userRequest.put(`/users/profile`, user, config);
        console.log(data)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

