import React from "react";

const Statistics = ({ value, title }) => {
    return (
        <div className="statistics-inner-container">
            <div className="statistics-diamond left"></div>
            <div className="statistics">
                <div className="statistics-stats">
                    <p>{value}</p>
                    <span>{title}</span>
                </div>
            </div>
            <div className="statistics-diamond right"></div>
        </div>
    );
};

export default Statistics;
