import React from "react";
import Shape from "../Shape/Shape";

const HistoryInfo = ({ year, desc, onClick }) => {
    return (
        <div className="history-info">
            <div className="history-info-diamonds">
                <div className="history-info-diamond"></div>
                <div className="history-info-diamond gold"></div>
            </div>
            <div className="history-info-desc">
                <span>{year}</span>
                <span>{desc}</span>
            </div>
            <div className="history-info-buttons">
                <div style={{ position: "relative", left: "50px" }}>
                    <div onClick={() => onClick(0)}>
                        <Shape
                            color="is-gray"
                            rotate="is-rotate"
                            right="4px"
                            top="auto"
                        />
                    </div>
                    <div onClick={() => onClick(1)}>
                        <Shape right="auto" top="auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryInfo;
