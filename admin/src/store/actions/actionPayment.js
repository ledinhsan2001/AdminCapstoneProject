import actionTypes from "./actionTypes";
import * as services from "../../services";

export const actionPayment = () => async (dispatch) => {
    try {
        const response = await services.apigetPaymentHistory();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_PAYMENT_HISTORY,
                payment_history: response.data.data,
                total_payment: response.data.total_payment,
            });
        } else {
            dispatch({
                type: actionTypes.GET_PAYMENT_HISTORY,
                message: response.data.message,
                payment_history: null,
                total_payment: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PAYMENT_HISTORY,
            payment_history: null,
            total_payment: 0,
            message: error.response.data.message,
        });
    }
};
export const actionGetAllPayHis = () => async (dispatch) => {
    try {
        const response = await services.apigetAllPayHis();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_ALL_PAYMENT_HISTORY,
                data_pay_his: response.data.data_pay_his,
                total_payment_his: response.data.total_payment_his,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_PAYMENT_HISTORY,
                message: response.data.message,
                data_pay_his: null,
                total_payment_his: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_PAYMENT_HISTORY,
            data_pay_his: null,
            total_payment_his: 0,
            message: error.response?.data?.message,
        });
    }
};
export const actiongetAllPayHisLimit = (page) => async (dispatch) => {
    try {
        const response = await services.apigetAllPayHisLimit(page);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_ALL_LIMIT_PAYMENT_HISTORY,
                limit_data_pay_his: response.data.data.limit_data_pay_his,
                total_all_pay_his: response.data.data.total_all_pay_his,
                page_count_pay_his: response.data.data.page_count_pay_his,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_LIMIT_PAYMENT_HISTORY,
                message: response.data.message,
                limit_data_pay_his: null,
                total_all_pay_his: 0,
                page_count_pay_his: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_LIMIT_PAYMENT_HISTORY,
            limit_data_pay_his: null,
            total_all_pay_his: 0,
            page_count_pay_his: 0,
            message: error.response?.data?.message,
        });
    }
};
