import React from "react";

const Fallback = ({ children }) => {
    return <div className="spinner-container">{children}</div>;
};

export default Fallback;
