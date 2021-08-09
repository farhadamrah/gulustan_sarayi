import React, { useEffect, useState } from "react";
import Shape from "../Shape/Shape";
// import { sliders } from "../../helpers/data";
import axios from "axios";
import { URLS } from "../../helpers/urls";
import { useStateValue } from "../StateManagement/StateProvider";
// import useInterval from "../../helpers/useInterval";
// import AliceCarousel from "react-alice-carousel";

// const createItems = (length, [handleClick]) => {
//     let deltaX = 0;
//     let difference = 0;
//     const swipeDelta = 20;
//     return sliders.map((item, i) => (
//         <div
//             key={`slidersArr-${i}`}
//             className={`item cursor`}
//             style={{ backgroundImage: `url(${item.src})` }}
//             data-value={i + 1}
//             onMouseDown={(e) => (deltaX = e.pageX)}
//             onMouseUp={(e) => (difference = Math.abs(e.pageX - deltaX))}
//             onClick={() => difference < swipeDelta && handleClick(i)}
//         ></div>
//     ));
// };

const HallsCarousel = ({ type, value }) => {
    const [slidersArr, setSlidersArr] = useState([]);
    const [active, setActive] = useState(slidersArr[0]);
    const [state, dispatch] = useStateValue();
    const stateCase = type == "hall" ? state?.halls : state?.events;
    useEffect(() => {
        // const source = axios.CancelToken.source();
        // const cancelToken = source.token;
        const fetchImages = async () => {
            const payload = {};

            payload[type + "_id"] = value;

            const res = await axios.post(
                `${type === "hall" ? URLS.halls.inner : URLS.events.inner}`,
                payload
            );
            setSlidersArr(res.data);
            setActive(res.data[0]);
        };
        fetchImages();
        // return () => {
        //     //abort the request
        //     source.cancel("axios request cancelled");
        // };
    }, [type, value]);
    // const [activeIndex, setActiveIndex] = useState(0);
    // const syncActiveIndex = ({ item }) => {
    //     setActive(slidersArr[item]);
    //     setActiveIndex(item);
    // };
    // const [items] = useState(
    //     createItems(slidersArr.length, [
    //         (s) => {
    //             setActiveIndex(s);
    //             setActive(slidersArr[s]);
    //         },
    //     ])
    // );

    // useInterval(() => {
    //     if (active.order !== slidersArr.length - 1) {
    //         setActive((prev) => slidersArr[prev.order + 1]);
    //         setActiveIndex((prev) => slidersArr[prev + 1]?.order);
    //     }
    //     if (active.order === slidersArr.length - 1) {
    //         setActive((prev) => slidersArr[0]);
    //         setActiveIndex(0);
    //     }
    // }, 3000);
    const slidersTrigger = (dir) => {
        // if (!dir) {
        //     if (active.order === 0) {
        //         setActive(slidersArr[slidersArr.length - 1]);
        //         setActiveIndex(slidersArr[slidersArr.length - 1]?.order);
        //     } else {
        //         setActive(slidersArr[active.order - 1]);
        //         setActiveIndex(slidersArr[active.order - 1]?.order);
        //     }
        // }
        // if (dir) {
        //     if (active.order === slidersArr.length - 1) {
        //         setActive(slidersArr[0]);
        //         setActiveIndex(slidersArr[0]?.order);
        //     } else {
        //         setActive(slidersArr[active.order + 1]);
        //         setActiveIndex(slidersArr[active?.order + 1].order);
        //     }
        // }
    };
    // const responsive = {
    //     0: {
    //         items: 1,
    //     },
    //     600: {
    //         items: 2,
    //     },
    //     1024: {
    //         items: 3,
    //     },
    // };
    return (
        <div className="hallsCarousel-container d-flex flex-column">
            <div className="hallsCarousel-container-top d-flex flex-column flex-md-row">
                <div className="hallsCarousel-container-top-left">
                    <div className="headings">
                        {/* <p>Raecen esit</p> */}
                        <h3>{stateCase[value - 1]?.title}</h3>
                        <p>{stateCase[value - 1]?.content}</p>
                    </div>
                    <div className="desc">
                        {/* <p>{stateCase[value - 1]?.content}</p> */}
                        <div className="buttons">
                            <div className="buttons-wrapper">
                                <div
                                    onClick={() => slidersTrigger(0)}
                                    style={{ position: "relative" }}
                                >
                                    <Shape
                                        color="is-gray"
                                        rotate="is-rotate"
                                        right="auto"
                                        top="auto"
                                    />
                                </div>
                                <div
                                    onClick={() => slidersTrigger(1)}
                                    style={{ position: "relative" }}
                                >
                                    <Shape right="90px" top="auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="hallsCarousel-container-top-right"
                    style={{
                        backgroundImage: `url(/storage/uploads/${active?.photo})`,
                    }}
                ></div>
            </div>
            <div className="hallsCarousel-container-hLine"></div>
            {/* <div className="hallsCarousel-container-bottom ">
                <AliceCarousel
                    mouseTracking
                    autoWidth
                    disableDotsControls
                    disableButtonsControls
                    animationType="slide"
                    animationDuration={400}
                    startIndex={0}
                    activeIndex={activeIndex}
                    responsive={responsive}
                    items={items}
                    onSlideChanged={syncActiveIndex}
                />
            </div> */}
        </div>
    );
};

export default HallsCarousel;
