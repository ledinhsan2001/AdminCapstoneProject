import authReducer from "./authReducer";
import userReducer from "./userReducer";
import realHomeReducer from "./realHomeReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import paymentReducer from "./paymentReducer";
import blogReducer from "./blogReducer";

const persistConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

//whitelist nói cho localStorage biết danh sách nào được giữ lại, blacklist ngược lại
const authConfig = {
    ...persistConfig,
    key: "auth",
    whitelist: ["isLoggedIn", "accessToken", "refreshToken", "isLoggedInAdmin"],
};

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    real_home: realHomeReducer,
    user: userReducer,
    payment: paymentReducer,
    blog: blogReducer,
});

export default rootReducer;
