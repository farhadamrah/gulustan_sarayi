import React from "react";
import Shape from "../Shape/Shape";

const Button = ({
    text,
    color = "rgba(255, 255, 255, 0.71)",
    type = "button",
    backgroundColor,
    fontWeight,
    className,
}) => {
    return (
        <div
            className={`custom-btn-container container-${
                className ? className : ""
            }`}
        >
            <button
                type={type}
                className={`custom-btn ${className}`}
                style={{ color, backgroundColor, fontWeight }}
            >
                {text}
            </button>
            <Shape />
        </div>
    );
};

export default Button;
