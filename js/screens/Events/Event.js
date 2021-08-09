import React, { useEffect, useLayoutEffect, useState } from "react";
import Section from "../../components/Section/Section";
import { hallsData } from "../../helpers/data";
import HallsBanner from "../../components/HallsBanner/HallsBanner";
import HallsCarousel from "../../components/HallsCarousel/HallsCarousel";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../helpers/urls";
import EventsComponent from "../../components/Events/Events";
import MetaTags from "react-meta-tags";
import { useStateValue } from "../../components/StateManagement/StateProvider";

const Events = ({ handleCollapse, collapsed, setCollapsed }) => {
    const location = useLocation();
    const { type } = useParams();
    const [meta, setMeta] = useState({});
    const [state, dispatch] = useStateValue();

    useLayoutEffect(() => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;
        const fetchMeta = async () => {
            try {
                const res = await axios.get(URLS.meta.base + `${2}`, {
                    cancelToken,
                });
                setMeta(res.data[0]);
            } catch (err) {
                console.log("err", err);
            }
        };
        fetchMeta();
        return () => {
            //abort the request
            source.cancel("axios request cancelled");
        };
    }, []);

    return (
        <>
            <MetaTags>
                <title>{meta?.meta_tag || "Gülüstan Sarayı"}</title>
                <meta
                    id="meta-description"
                    name="description"
                    content={meta?.description}
                />
                <meta
                    id="og-title"
                    property="og:title"
                    content={meta?.meta_tag}
                />
                <meta
                    id="og-image"
                    property="og:image"
                    content="path/to/image.jpg"
                />
            </MetaTags>
            <Section className="section" id="section1">
                <HallsBanner
                    handleCollapse={handleCollapse}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    info={state?.events[+type - 1]}
                />
            </Section>
            <Section className="section" id="halls-section2">
                <HallsCarousel type="event" value={type} />
            </Section>
            {/* <Section className="section h-100" id="events-info-section3">
                <div className="halls-position">
                    <div className="container">
                        <div className="row">
                            {hallsData.map((hall, idx) => (
                                <div
                                    key={`hallDesc-${idx}`}
                                    className="col-lg-4"
                                >
                                    <span className="halls-number">
                                        {hall.count}
                                    </span>
                                    <h5> {hall.name} </h5>

                                    <div className=" halls-border">
                                        <div className="">
                                            <span
                                                className="symbol"
                                                id="symbol1"
                                            ></span>
                                        </div>
                                        <div className="">
                                            <span className="symbol-white"></span>
                                        </div>
                                        <div className="">
                                            <span
                                                className="symbol"
                                                id="symbol3"
                                            ></span>
                                        </div>
                                    </div>
                                    <p className="halls-write"> {hall.text} </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section> */}
            <Section className="section h-100" id="events-section4">
                <EventsComponent events={state?.events} selected={type} />
            </Section>
        </>
    );
};

export default Events;
