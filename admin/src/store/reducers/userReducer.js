import actionTypes from "../actions/actionTypes";

const initState = {
    user_data: {},
};

//action nhận thông qua dispatcher của redux
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                user_data: action.user_data || null,
                message: action.message || "",
            };
        case actionTypes.GET_PAYMENT_HISTORY:
            return {
                ...state,
                payment_history: action.payment_history || null,
                total_payment: action.total_payment || 0,
                message: action.message || "",
            };
        case actionTypes.GET_All_USER:
            return {
                ...state,
                total_all_user: action.total_all_user,
                all_user: action.all_user,
                message: action.message,
            };
        case actionTypes.GET_All_LIMIT_USER:
            return {
                ...state,
                message: action.message,
                limit_data_user: action.limit_data_user,
                total_all_user: action.total_all_user,
                page_count_user: action.page_count_user,
            };
        default:
            return state;
    }
};

export default userReducer;
