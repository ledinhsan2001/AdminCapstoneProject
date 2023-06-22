import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
            <div className="flex-row d-flex">
                <button
                    type="button"
                    className="navbar-toggler mr-2 "
                    data-toggle="offcanvas"
                    title="Toggle responsive left sidebar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to={"/admin"} className="flex text-white ml-6">
                    <p className="text-blue-500">REAL</p>HOMES
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;
