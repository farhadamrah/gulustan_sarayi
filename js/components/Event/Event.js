import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

const Event = ({ img, name, color, type, selected }) => {
    return (
        <div className="row events-main">
            <div
                className="col-lg-8 overlay-event position-relative"
                style={{ padding: "0" }}
            >
                <Link
                    to={{
                        pathname: `/events/${type}`,
                    }}
                >
                    <div
                        className={`overlay ${
                            selected === type && "show-half"
                        }`}
                    ></div>
                    <LazyLoad height={135} once>
                        <img
                            src={img}
                            className="event-photos"
                            alt="Photos For Events"
                        />
                    </LazyLoad>
                </Link>
                <LazyLoad height={135} once>
                    <img
                        src="/images/section3/crystal.png"
                        className="events-crystal"
                        alt="Photos For Events Symbol"
                    />
                </LazyLoad>
            </div>

            <div className={`col-lg-4 events-a  ${color}`}>
                <div className="events-face">
                    <Link
                        to={{
                            pathname: `/events/${type}`,
                        }}
                    >
                        {name}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Event;
