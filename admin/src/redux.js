import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";

const reduxStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk)); // middle đươc thêm vào tham số thứ 2.
    const persistor = persistStore(store);

    return { store, persistor };
};

export default reduxStore;
