import actionTypes from "./actionTypes";
import {
    apiGetDetailRealHome,
    apiGetLimitRealHome,
    apiGetNewPost,
    apiGetRealHomeTypeBS,
    apiGetRealHomeTypeR,
    apiGetTransactionType,
    apiGetAllRHByUser,
    apiGetSavePost,
    apiGetAllRHPublicByUser,
    apiGetAllRHByUserUnPay,
    apiGetnewsType,
    apiGetNumberDay,
    apiGetAllRealHome,
} from "../../services/index";

// ----------------------------------------------------------
export const getAllRealHome = () => async (dispatch) => {
    try {
        const response = await apiGetAllRealHome();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_ALL_RHS,
                all_real_home: response.data.data,
                total_all_data: response.data.total_all_data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_RHS,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_RHS,
            all_real_home: null,
            total_all_data: null,
        });
    }
};

export const realHomeDetail = (id) => async (dispatch) => {
    try {
        const response = await apiGetDetailRealHome(id);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_DETAIL_POST,
                real_home_detail: response.data.data,
                news_type_detail: response.data.news_type,
            });
        } else {
            dispatch({
                type: actionTypes.GET_DETAIL_POST,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_DETAIL_POST,
            real_home_detail: null,
            news_type: null,
        });
    }
};

export const realHomeLimit = (payload) => async (dispatch) => {
    try {
        const response = await apiGetLimitRealHome(payload);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_RHS_LIMIT,
                real_homes: response.data.data.data,
                page_count: response.data.data.page_count,
                total_data: response.data.data.total_data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_RHS_LIMIT,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RHS_LIMIT,
            real_homes: [],
            message: error?.response?.data?.message,
        });
    }
};

export const realHomePublicByUser = (_id) => async (dispatch) => {
    try {
        const response = await apiGetAllRHPublicByUser(_id);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_RHS_PUBLIC_BY_USER,
                real_homes_public_by_user: response.data.data,
                total_post_by_user: response.data.total_post_by_user,
            });
        } else {
            dispatch({
                type: actionTypes.GET_RHS_PUBLIC_BY_USER,
                real_homes_public_by_user: [],
                total_post_by_user: 0,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RHS_PUBLIC_BY_USER,
            total_post_by_user: 0,
            real_homes_public_by_user: [],
            message: error.response.data.message,
        });
    }
};

export const realHomeByUser = (page) => async (dispatch) => {
    try {
        const response = await apiGetAllRHByUser(page);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_RHS_BY_USER,
                real_homes_by_user: response.data.data.data,
                page_count: response.data.data.page_count,
                total_data: response.data.data.total_data,
                payment_data: response.data.data.payment,
            });
        } else {
            dispatch({
                type: actionTypes.GET_RHS_BY_USER,
                message: response.data.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RHS_BY_USER,
            real_homes_by_user: [],
            payment: [],
            message: error.response.data.message,
        });
    }
};

export const realHomeByUserUnPay = () => async (dispatch) => {
    try {
        const response = await apiGetAllRHByUserUnPay();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_RHS_BY_USER_UNPAY,
                real_homes_by_user_unpay: response.data.data.data,
                total_unpay: response.data.data.total_data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_RHS_BY_USER_UNPAY,
                message: response.data.data.message,
                real_homes_by_user_unpay: null,
                total_unpay: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RHS_BY_USER_UNPAY,
            real_homes_by_user_unpay: null,
            total_unpay: 0,
            message: error.response.data.message,
        });
    }
};

// ----------------------------------------------------------

export const newPost = () => async (dispatch) => {
    try {
        const response = await apiGetNewPost();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                new_posts: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            new_posts: [],
            message: error?.response?.data?.message,
        });
    }
};

// dispatch data post
export const dataEdit = (data_edit) => async (dispatch) => {
    dispatch({
        type: actionTypes.RH_EDIT,
        data_edit,
    });
};

export const delDataEdit = () => async (dispatch) => {
    dispatch({
        type: actionTypes.DEL_DATA_EDIT,
        data_edit: null,
    });
};

// ----------------------------------------------------------

export const realHomeTypes = () => async (dispatch) => {
    try {
        const responseBS = await apiGetRealHomeTypeBS();
        const responseR = await apiGetRealHomeTypeR();
        if (
            responseBS?.data.success === true &&
            responseR?.data.success === true
        ) {
            dispatch({
                type: actionTypes.GET_REAL_HOME_TYPES,
                real_home_types_bs: responseBS.data.data,
                real_home_types_r: responseR.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_REAL_HOME_TYPES,
                message_bs: responseBS.data.message,
                message_r: responseR.data.message,
                real_home_types_bs: null,
                real_home_types_r: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_REAL_HOME_TYPES,
            real_home_types_bs: null,
            real_home_types_r: null,
        });
    }
};

// ----------------------------------------------------------

export const actionTransactionType = () => async (dispatch) => {
    try {
        const response = await apiGetTransactionType();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_TRANSACTION_TYPES,
                transaction_types: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_TRANSACTION_TYPES,
                message: response.data.message,
                transaction_types: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TRANSACTION_TYPES,
            transaction_types: null,
        });
    }
};

// ----------------------------------------------------------

export const actionGetSavePost = () => async (dispatch) => {
    try {
        const response = await apiGetSavePost();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_SAVE_POST,
                saved_post: response.data.data,
                total_post: response.data.total_post,
                message: response.data.message,
            });
        } else {
            dispatch({
                type: actionTypes.GET_SAVE_POST,
                message: response.data.message,
                saved_post: null,
                total_post: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SAVE_POST,
            message: error.response.data.message,
            saved_post: null,
            total_post: 0,
        });
    }
};

export const actionGetNewsType = () => async (dispatch) => {
    try {
        const response = await apiGetnewsType();
        const number_day = await apiGetNumberDay();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_NEWS_TYPE,
                news_type: response.data.data,
                number_day: number_day.data.data,
                message: response.data.message,
            });
        } else {
            dispatch({
                type: actionTypes.GET_NEWS_TYPE,
                message: response.data.message,
                number_day_message: number_day.data.message,
                number_day: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEWS_TYPE,
            message: error.response.data.message,
            news_type: null,
            number_day: null,
        });
    }
};
