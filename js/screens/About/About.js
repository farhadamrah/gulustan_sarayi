import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavMenu from "../../components/NavMenu/NavMenu";
import { URLS } from "../../helpers/urls";
import MetaTags from "react-meta-tags";
import axios from "axios";
import LazyBackground from "../../helpers/LazyBackground";

const About = ({ collapsed, setCollapsed, handleCollapse }) => {
    const [meta, setMeta] = useState({});
    const [about, setAbout] = useState({});

    useLayoutEffect(() => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;
        const fetchMeta = async () => {
            try {
                const res = await axios.get(URLS.meta.base + `${5}`, {
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
    useEffect(() => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;
        const fetchAbout = async () => {
            const res = await axios.get(URLS.about.base, { cancelToken });
            setAbout(res.data[0]);
        };
        fetchAbout();
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
            <div className="about-container">
                <LazyBackground
                    className="about-banner"
                    src={`/storage/uploads/${about?.photo}`}
                >
                    <div
                        className={collapsed ? "backdrop" : "none"}
                        onClick={() => setCollapsed(!collapsed)}
                    ></div>

                    <Header
                        handleCollapse={handleCollapse}
                        collapsed={collapsed}
                        style={"is-header-white"}
                    />
                    <NavMenu
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />

                    <div className="titles">
                        <h1>{about.title || ""}</h1>
                    </div>
                </LazyBackground>
                <div className="article-container">
                    <h1>{"Tarİxİn bİr parçası olun"}</h1>
                    <article>{about.content || ""}</article>
                </div>
            </div>
        </>
    );
};

export default About;
