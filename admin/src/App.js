import { Routes, Route } from "react-router-dom";
import { path } from "./utils/constant";
import "./App.css";
import {
    AccountManage,
    DashBoard,
    HomeAdmin,
    LoginAdmin,
    StatisticalMoney,
    StatisticalPost,
} from "./containers/Admin";
import HistoryList from "./containers/Admin/HistoryList";

function App() {
    return (
        <div className="App overflow-hidden w-screen">
            <div className="auth-wrapper">
                <div className="auth-inner flex">
                    <Routes>
                        <Route path={path.HOME_ADMIN} element={<HomeAdmin />}>
                            <Route path="*" element={<DashBoard />} />
                            <Route
                                path={path.LOGIN_ADMIN}
                                element={<LoginAdmin />}
                            />
                            <Route
                                path={path.STATISTICAL_POST}
                                element={<StatisticalPost />}
                            />
                            <Route
                                path={path.STATISTICAL_MONEY}
                                element={<StatisticalMoney />}
                            />
                            <Route
                                path={path.HISTORY_LIST}
                                element={<HistoryList />}
                            />
                            <Route
                                path={path.ACCOUNT_MANAGE}
                                element={<AccountManage />}
                            />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
