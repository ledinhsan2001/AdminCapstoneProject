import React from "react";
import { path } from "../../utils/constant";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../store/actions";
import { mdi_user } from "../../assets/images";
import { MdEditNote } from "react-icons/md";
const SidebarMain = () => {
    const dispatch = useDispatch();
    const { user_data } = useSelector((state) => state.user);

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logoutAdmin());
    };

    return (
        <div
            className="fixed top-0 left-0 w-[300px] sidebar-offcanvas pl-0 bg-[#e9ecef] pb-[560px]"
            id="sidebar"
            role="navigation"
        >
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 text-left">
                <li className="nav-item mb-2 mt-3">
                    <div className="flex items-center justify-center">
                        <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[60px] w-[60px] pt-1 mb-2">
                            <span className="animate-ping absolute inline-flex h-[8px] w-[8px] rounded-full bg-green-500 opacity-100 ml-[50px] mb-[40px]"></span>
                            <img
                                src={user_data?.avt || mdi_user}
                                alt="mdi_user"
                                className="h-[65px] w-[70px] rounded-full"
                            ></img>
                        </div>

                        <p className="nav-link font-bold text-[20px] text-blue-500">{`${user_data?.first_name} ${user_data?.last_name}`}</p>
                    </div>
                </li>
                <li className="nav-item mb-2 ">
                    <Link to={`/`} className="nav-link text-secondary">
                        <i className="fas fa-user font-weight-bold"></i>{" "}
                        <span className="ml-3">Tổng quan</span>
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to={`/${path.STATISTICAL_MONEY}`}
                        className="nav-link text-secondary"
                    >
                        <i className="far fa-file-word font-weight-bold"></i>
                        <span className="ml-3">Thống kê thu nhập</span>
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to={`/${path.STATISTICAL_POST}`}
                        className="nav-link text-secondary"
                    >
                        <i className="fas fa-tablet-alt font-weight-bold"></i>
                        <span className="ml-3">Thống kê tin đăng</span>
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to={`/${path.HISTORY_LIST}`}
                        className="nav-link text-secondary"
                    >
                        <i className="far fa-folder font-weight-bold"></i>{" "}
                        <span className="ml-3">Danh sách lịch sử</span>
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to={`/${path.BLOG_MANAGEMENT}`}
                        className="nav-link text-secondary flex items-center"
                    >
                        <MdEditNote size={26} />
                        <span className="ml-3">Quản lý Blog</span>
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to={`/${path.ACCOUNT_MANAGE}`}
                        className="nav-link text-secondary"
                    >
                        <i className="far fa-chart-bar font-weight-bold"></i>{" "}
                        <span className="ml-3">Quản lý tài khoản</span>
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to={`/${path.LOGIN_ADMIN}`}
                        className="nav-link text-secondary"
                        onClick={(e) => {
                            handleLogOut(e);
                        }}
                    >
                        <i className="fas fa-file-export font-weight-bold"></i>
                        <span className="ml-3">Đăng xuất</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarMain;
