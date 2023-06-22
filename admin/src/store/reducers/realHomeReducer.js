import actionTypes from "../actions/actionTypes";

const initState = {
    real_homes: [],
    message: "",
    page_count: 0,
    new_posts: [],
    transaction_types: [],
    real_home_types_bs: [],
    real_home_types_r: [],
};

const realHomeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_RHS:
        case actionTypes.GET_RHS_LIMIT:
            return {
                ...state,
                real_homes: action.real_homes || [],
                message: action.message || "",
                page_count: action.page_count || 0,
                total_data: action.total_data || 0,
            };
        case actionTypes.GET_RHS_PUBLIC_BY_USER:
            return {
                ...state,
                real_homes_public_by_user:
                    action.real_homes_public_by_user || [],
                message: action.message || "",
                total_post_by_user: action.total_post_by_user || 0,
            };
        case actionTypes.GET_RHS_BY_USER:
            return {
                ...state,
                real_homes_by_user: action.real_homes_by_user || [],
                message: action.message || "",
                page_count: action.page_count || 0,
                total_data: action.total_data || 0,
                payment_data: action.payment_data || [],
            };
        case actionTypes.GET_RHS_BY_USER_UNPAY:
            return {
                ...state,
                real_homes_by_user_unpay: action.real_homes_by_user_unpay || [],
                message: action.message || "",
                total_unpay: action.total_unpay || 0,
            };
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                new_posts: action.new_posts || [],
                message: action.message || "",
            };
        case actionTypes.GET_DETAIL_POST:
            return {
                ...state,
                real_home_detail: action.real_home_detail || [],
                news_type_detail: action.news_type_detail || [],
                message: action.message || "",
            };
        case actionTypes.RH_EDIT:
            return {
                ...state,
                data_edit: action.data_edit || [],
                message: action.message || "",
            };
        case actionTypes.DEL_DATA_EDIT:
            return {
                ...state,
                data_edit: null,
                message: action.message || "",
            };
        case actionTypes.GET_REAL_HOME_TYPES:
            return {
                ...state,
                real_home_types_bs: action.real_home_types_bs || [],
                real_home_types_r: action.real_home_types_r || [],
                message_bs: action.message_bs || "",
                message_r: action.message_r || "",
            };
        case actionTypes.GET_TRANSACTION_TYPES:
            return {
                ...state,
                transaction_types: action.transaction_types || [],
                message: action.message || "",
            };
        case actionTypes.GET_SAVE_POST:
            return {
                ...state,
                saved_post: action.saved_post || [],
                total_post: action.total_post || 0,
                message: action.message || "",
            };
        case actionTypes.GET_NEWS_TYPE:
            return {
                ...state,
                news_type: action.news_type || [],
                number_day: action.number_day || [],
                message: action.message || "",
                number_day_message: action.number_day_message || "",
            };
        case actionTypes.GET_ALL_RHS:
            return {
                ...state,
                all_real_home: action.all_real_home || [],
                total_all_data: action.total_all_data || 0,
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default realHomeReducer;
