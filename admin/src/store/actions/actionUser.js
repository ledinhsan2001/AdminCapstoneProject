import actionTypes from "./actionTypes";
import { apiGetAllUser, apiGetAllUserLimit, apiGetUser } from "../../services";
export const actionUser = () => async (dispatch) => {
    try {
        const response = await apiGetUser();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_USER,
                user_data: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_USER,
                message: response.data.message,
                user_data: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER,
            user_data: null,
        });
    }
};

export const actionAllUser = () => async (dispatch) => {
    try {
        const response = await apiGetAllUser();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_All_USER,
                all_user: response.data.all_user,
                total_all_user: response.data.total_all_user,
            });
        } else {
            dispatch({
                type: actionTypes.GET_All_USER,
                message: response.data.message,
                all_user: null,
                total_all_user: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_All_USER,
            all_user: null,
            total_all_user: null,
            message: "",
        });
    }
};

export const actionAllUserLimit = (page) => async (dispatch) => {
    try {
        const response = await apiGetAllUserLimit(page);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_All_LIMIT_USER,
                limit_data_user: response.data.data.limit_data_user,
                total_all_user: response.data.data.total_all_user,
                page_count_user: response.data.data.page_count_user,
            });
        } else {
            dispatch({
                type: actionTypes.GET_All_LIMIT_USER,
                message: response.data.message,
                limit_data_user: null,
                total_all_user: 0,
                page_count_user: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_All_LIMIT_USER,
            limit_data_user: null,
            total_all_user: 0,
            page_count_user: 0,
            message: "",
        });
    }
};
