import React, { useState } from "react";
import { Link } from "react-router-dom";
import LazyBackground from "../../helpers/LazyBackground";
import Button from "../Button/Button";

const HallImage = ({ order, src, title, selected, onclick }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <LazyBackground
            className="hallImage cursor"
            src={src}
            onMouseEnter={(e) => {
                setIsVisible(true);
            }}
            onMouseLeave={(e) => {
                setIsVisible(false);
            }}
            onClick={onclick}
        >
            <span
                className={`hallImage-order ${
                    selected == order ? "hide" : isVisible ? "hide" : "show"
                }`}
            >
                {`0${order}`}
            </span>
            <div
                className={`hallImage-cover ${
                    isVisible || selected == order ? "show" : "hide"
                }`}
            ></div>
            <div
                className={`hallImage-info ${
                    isVisible || selected == order ? "show" : "hide"
                }`}
            >
                <p>{`0${order}`}</p>
                <span>{title}</span>
            </div>
            <div
                className={`hallImage-explore ${
                    selected == order ? "hide" : isVisible ? "show" : "hide"
                }`}
            >
                <Link
                    to={{
                        pathname: `/halls/${order}`,
                    }}
                >
                    <Button text="ƏTRAFLI" color="#fff" />
                </Link>
            </div>
        </LazyBackground>
    );
};

export default HallImage;
