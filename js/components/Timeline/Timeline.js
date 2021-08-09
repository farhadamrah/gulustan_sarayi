import React, { useRef, useState, useEffect } from "react";
import History from "../History/History";
import HistoryInfo from "../HistoryInfo/HistoryInfo";
import axios from "axios";
import { URLS } from "../../helpers/urls";
import ScrollContainer from "react-indiana-drag-scroll";
import { useStateValue } from "../StateManagement/StateProvider";

const Timeline = () => {
    const prevTrigger = useRef(0);
    const [trigger, setTrigger] = useState(0);
    const [state, dispatch] = useStateValue();

    const triggerHandler = (dir) => {
        if (!dir) {
            if (trigger === 0) {
                prevTrigger.current = trigger;
                setTrigger(state?.timeline.length - 1);
            } else {
                prevTrigger.current = trigger;
                setTrigger((prev) => prev - 1);
            }
        }
        if (dir) {
            if (trigger === state?.timeline.length - 1) {
                prevTrigger.current = trigger;
                setTrigger(0);
            } else {
                prevTrigger.current = trigger;
                setTrigger((prev) => prev + 1);
            }
        }
    };

    const hoverHandler = (idx2) => {
        prevTrigger.current = trigger;
        setTrigger(idx2);
    };

    const clickHandler = (idx2) => {
        prevTrigger.current = trigger;
        setTrigger(idx2);
    };

    function sortYears(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        if (!state.timeline.length) {
            const source = axios.CancelToken.source();
            const cancelToken = source.token;
            (async () => {
                try {
                    const res = await axios.get(URLS.history.base, {
                        cancelToken,
                    });
                    dispatch({
                        type: "GET_TIMELINE",
                        timeline: res.data.sort(sortYears),
                    });
                    dispatch({
                        type: "GET_YEARS",
                        timeline: res.data.sort(sortYears),
                    });

                    return res;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            })();
        }
        return () => {
            //abort the request
            source.cancel("axios request cancelled");
        };
    }, []);

    return (
        <ScrollContainer className="timeline-container" vertical={false}>
            <div className="timeline">
                <div className="timeline-shapes">
                    <div className="timeline-rectangle"></div>
                    <div className="timeline-dotted"></div>
                    <div className="timeline-dots">
                        {state?.years.map((y, idx) => {
                            if (idx === 0 || idx === state?.years.length - 1)
                                return (
                                    <div
                                        key={`dots-${idx}`}
                                        className="timeline-dot gold"
                                    ></div>
                                );
                            return (
                                <div
                                    key={`dot-${idx}`}
                                    className="timeline-dot"
                                ></div>
                            );
                        })}
                    </div>
                    <div className="timeline-years">
                        {state?.years.map((y, idx) => (
                            <span key={`years-${idx}`}>{y}</span>
                        ))}
                    </div>
                </div>
                <div className="timeline-history">
                    {[
                        ...new Array(
                            state?.years.length ? state?.years.length - 1 : 0
                        ),
                    ].map((n, idx) => (
                        <div
                            key={`outer-${idx}`}
                            className={`timeline-history-outer outer-${state?.years[idx]} d-flex`}
                            style={{
                                width: `calc(100%/(${
                                    state?.years.length - 1
                                }))`,
                            }}
                        >
                            {[...new Array(10)].map((n, idx1) => (
                                <div
                                    key={`inner-${idx1}`}
                                    className={`timeline-history-outer-inner inner-${idx1}`}
                                    style={{ width: "10%" }}
                                >
                                    {state?.timeline.map((h, idx2) => {
                                        if (trigger === idx2) {
                                            if (
                                                new Date(
                                                    h.date
                                                ).getFullYear() >=
                                                    state?.years[idx] &&
                                                new Date(h.date).getFullYear() <
                                                    state?.years[idx + 1]
                                            ) {
                                                if (
                                                    +new Date(h.date)
                                                        .getFullYear()
                                                        .toString()[
                                                        new Date(h.date)
                                                            .getFullYear()
                                                            .toString().length -
                                                            1
                                                    ] == idx1
                                                ) {
                                                    return (
                                                        <div
                                                            key={`history-${idx2}-${Math.random()}`}
                                                            className="timeline-history-container"
                                                        >
                                                            <History
                                                                src={h.icon}
                                                                className="history-selected"
                                                            />
                                                            <HistoryInfo
                                                                year={new Date(
                                                                    h.date
                                                                )
                                                                    .getFullYear()
                                                                    .toString()}
                                                                desc={h.title}
                                                                onClick={
                                                                    triggerHandler
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                }
                                            }
                                        } else {
                                            if (
                                                new Date(
                                                    h.date
                                                ).getFullYear() >=
                                                    state?.years[idx] &&
                                                new Date(h.date).getFullYear() <
                                                    state?.years[idx + 1]
                                            ) {
                                                if (
                                                    +new Date(h.date)
                                                        .getFullYear()
                                                        .toString()[
                                                        new Date(h.date)
                                                            .getFullYear()
                                                            .toString().length -
                                                            1
                                                    ] == idx1
                                                ) {
                                                    return (
                                                        <div
                                                            key={`history-${idx2}-${Math.random()}`}
                                                            className="timeline-history-container"
                                                            onClick={() =>
                                                                clickHandler(
                                                                    idx2
                                                                )
                                                            }
                                                            onMouseEnter={() =>
                                                                hoverHandler(
                                                                    idx2
                                                                )
                                                            }
                                                        >
                                                            <History
                                                                src={h.icon}
                                                                className={`${
                                                                    prevTrigger.current ===
                                                                    idx2
                                                                        ? "prev-history"
                                                                        : ""
                                                                }`}
                                                            />
                                                        </div>
                                                    );
                                                }
                                            }
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </ScrollContainer>
    );
};
export default Timeline;
