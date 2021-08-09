import React from "react";
import Header from "../Header/Header";
import NavMenu from "../NavMenu/NavMenu";

const HallsBanner = ({ handleCollapse, collapsed, setCollapsed, info }) => {
    return (
        <div
            className="halls-container"
            style={{ backgroundImage: `url(/storage/uploads/${info?.photo})` }}
        >
            <div
                className={collapsed ? "backdrop" : "none"}
                onClick={() => setCollapsed(!collapsed)}
            ></div>
            <Header
                handleCollapse={handleCollapse}
                collapsed={collapsed}
                style={"is-header-white"}
            />
            <NavMenu collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="titles">
                <h1>{info?.title?.toUpperCase()}</h1>
                {/* <h2>{"Vivamus consequat tellus"}</h2> */}
            </div>
        </div>
    );
};

export default HallsBanner;
