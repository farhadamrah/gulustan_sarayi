import React from "react";
import LazyBackground from "../../helpers/LazyBackground";

const History = ({ src, className }) => {
    return (
        <LazyBackground
            className={`history cursor ${className}`}
            src={`/storage/uploads/${src}`}
        ></LazyBackground>
    );
};

export default History;
