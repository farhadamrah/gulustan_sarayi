import React from "react";

const Shape = ({ color = "", rotate = "", right = "26px", top = "22px" }) => {
    return (
        <div
            className={`custom-btn-shape cursor ${color} ${rotate}`}
            style={{ right, top }}
        >
            <div className={`custom-btn-shape-circle`}></div>
            <div className={`custom-btn-shape-line`}></div>
            <div className={`custom-btn-shape-arrow`}></div>
        </div>
    );
};

export default Shape;
