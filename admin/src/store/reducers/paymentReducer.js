import actionTypes from "../actions/actionTypes";

const initState = {
    total_payment_his: 0,
    data_pay_his: [],
    message: "",
};

const paymentReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PAYMENT_HISTORY:
            return {
                ...state,
                total_payment_his: action.total_payment_his,
                data_pay_his: action.data_pay_his,
                message: action.message,
            };
        case actionTypes.GET_ALL_LIMIT_PAYMENT_HISTORY:
            return {
                ...state,
                limit_data_pay_his: action.limit_data_pay_his,
                total_all_pay_his: action.total_all_pay_his,
                page_count_pay_his: action.page_count_pay_his,
                message: action.message,
            };
        default:
            return state;
    }
};

export default paymentReducer;
