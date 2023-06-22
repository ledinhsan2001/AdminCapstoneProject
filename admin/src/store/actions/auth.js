import actionTypes from "./actionTypes";
export const loginAdmin = (response) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOGIN_ADMIN_SUCCESS,
        data: response.data,
        message: response.data.message,
    });
};
export const logoutAdmin = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOG_OUT_ADMIN,
    });
};
