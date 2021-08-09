import React from "react";
import Header from "../../components/Header/Header";
import NavMenu from "../../components/NavMenu/NavMenu";
export default function Error404({ collapsed, setCollapsed, handleCollapse }) {
    return (
        <>
            <Header
                handleCollapse={handleCollapse}
                collapsed={collapsed}
                style={"is-header-white"}
            />
            <NavMenu collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="error-404">
                <h1>404 Not Found</h1>
            </div>
        </>
    );
}
