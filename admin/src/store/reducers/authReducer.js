import actionTypes from "../actions/actionTypes";

const initState = {
    accessToken: null,
    refreshToken: null,
    isLoggedInAdmin: false,
    message: "",
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_ADMIN_SUCCESS:
            return {
                ...state,
                isLoggedInAdmin: true,
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken,
                message: action.message,
            };
        case actionTypes.LOGIN_ADMIN_FAIL:
            return {
                ...state,
                isLoggedInAdmin: false,
                message: action.message,
                accessToken: null,
                refreshToken: null,
            };
        case actionTypes.LOG_OUT_ADMIN:
            return {
                ...state,
                isLoggedInAdmin: false,
                message: "Đăng xuất thành công",
                accessToken: null,
                refreshToken: null,
                user_data: null,
            };
        default:
            return state;
    }
};

export default authReducer;
