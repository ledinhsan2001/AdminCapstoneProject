import React, { useEffect } from "react";
import { NavBar } from ".";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../utils/constant";
import {
    actionAllUser,
    actionGetAllPayHis,
    actionUser,
    getAllRealHome,
} from "../../store/actions";

const HomeAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedInAdmin } = useSelector((state) => state.auth);

    useEffect(() => {
        !isLoggedInAdmin && navigate(`/admin/${path.LOGIN_ADMIN}`);
        setTimeout(() => {
            isLoggedInAdmin && dispatch(actionUser());
        }, 2000);
        dispatch(getAllRealHome());
        dispatch(actionGetAllPayHis());
        dispatch(actionAllUser());
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
