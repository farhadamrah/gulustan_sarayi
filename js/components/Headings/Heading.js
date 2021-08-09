import React from "react";

const Heading = ({ title, desc, className = "", hyperlink }) => {
    return (
        <div className={`heading ${className}`} id={hyperlink}>
            <h2>{title}</h2>
            <p>{desc}</p>
        </div>
    );
};

export default Heading;
