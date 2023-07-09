import React, { useEffect } from "react";
import { NavBar } from ".";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../utils/constant";
import {
    actionAllUser,
    actionGetAllBlogLimit,
    actionGetAllPayHis,
    actionGetAlllBlogType,
    actionUser,
    getAllRealHome,
} from "../../store/actions";

const HomeAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedInAdmin } = useSelector((state) => state.auth);

    useEffect(() => {
        !isLoggedInAdmin && navigate(`/${path.LOGIN_ADMIN}`);
        if (isLoggedInAdmin) {
            setTimeout(() => {
                dispatch(actionUser());
                dispatch(getAllRealHome());
                dispatch(actionGetAllPayHis());
                dispatch(actionAllUser());
                dispatch(actionGetAllBlogLimit({ page: 0 }));
                dispatch(actionGetAlllBlogType());
            }, 2000);
        }
        // eslint-disable-next-line
    }, [isLoggedInAdmin]);

    return (
        <div className="w-full">
            <NavBar />
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default HomeAdmin;
