import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { logout } from "./redux/auth_slice/login_user_slice";

export const AppTopbar = (props) => {
    // const handleLogout = () => {
    //     localStorage.removeItem("login");
    //     window.location.reload();
    // };
    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch(logout());

    }

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === "light" ? "assets/layout/images/teek_logo.svg" : "assets/layout/images/teek_logo.svg"} alt="logo" />                
            </Link>
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>
            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>
            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={logoutUser}>
                        <i className="pi pi-user-minus" />
                        <span>Logout</span>
                    </button>
                </li>

            </ul>
        </div>
    );
};
