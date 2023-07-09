import { Routes, Route, useNavigate } from "react-router-dom";
import { path } from "./utils/constant";
import "./App.css";
import {
    AccountManage,
    Blog,
    DashBoard,
    HomeAdmin,
    LoginAdmin,
    StatisticalMoney,
    StatisticalPost,
} from "./containers/Admin";
import HistoryList from "./containers/Admin/HistoryList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutAdmin } from "./store/actions";
import BlogDetail from "./containers/Admin/BlogDetail";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user_data } = useSelector((state) => state.user);

    useEffect(() => {
        if (!user_data) {
            navigate(`/${path.LOGIN_ADMIN}`);
            dispatch(logoutAdmin());
        }
        // eslint-disable-next-line
    }, [user_data]);

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
                            <Route
                                path={path.BLOG_MANAGEMENT}
                                element={<Blog />}
                            />
                            <Route
                                path={path.BLOG_DETAIL__ID}
                                element={<BlogDetail />}
                            />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
