import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { WindowScrollController } from "@fullcalendar/core";

export const AppTopbar = (props) => {
    const handleLogout = () => {
        localStorage.removeItem("login");
        window.location.reload();
    };

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === "light" ? "assets/layout/images/js_connect_logo_main@2x.png" : "assets/layout/images/logo-white.svg"} alt="logo" />
                {/* <span style={{ color: "#004890" }}>JS Connect</span> */}
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={handleLogout}>
                        <i className="pi pi-user-minus" />
                        <span>Logout</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-cog" />
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};
