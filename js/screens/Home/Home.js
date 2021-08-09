import React, { useEffect, useLayoutEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Section from "../../components/Section/Section";
import Statistics from "../../components/Statistics/Statistics";
import Timeline from "../../components/Timeline/Timeline";
import Events from "../../components/Events/Events";
import Heading from "../../components/Headings/Heading";
import Reserve from "../../components/Reserve/Reserve";
import Halls from "../../components/Halls/Halls";
import LazyBackground from "../../helpers/LazyBackground";
import { URLS } from "../../helpers/urls";
import MetaTags from "react-meta-tags";
import axios from "axios";
import { useStateValue } from "../../components/StateManagement/StateProvider";

const Home = ({ handleCollapse, collapsed, setCollapsed }) => {
    const [meta, setMeta] = useState({});
    const [state, dispatch] = useStateValue();

    useLayoutEffect(() => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;
        const fetchMeta = async () => {
            try {
                const res = await axios.get(URLS.meta.base + `${1}`, {
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
                <Banner
                    handleCollapse={handleCollapse}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
            </Section>
            <Section className="section h-100" id="section2">
                <LazyBackground
                    src="/images/section2/History.png"
                    className="section2-background"
                ></LazyBackground>
                <div className="history-home-section">
                    <Heading
                        title="TARİXİMİZ"
                        desc="Önəmli tarixlər"
                        hyperlink="history-section"
                    />
                    <Timeline />
                </div>
            </Section>
            <Section className="section h-100" id="section3">
                <Heading
                    title="TƏDBİRLƏR"
                    desc="Özəl günlərinizi tarixə çevirin"
                    hyperlink="events-section"
                />
                <Events events={state?.events} />
            </Section>
            <Section className="section h-100" id="section4">
                <Heading
                    title="ZALLAR"
                    desc="Tarixə şahidlik edən otaqlar"
                    hyperlink="halls-section"
                />
                <Halls halls={state?.halls} />
                <div className="statistics-container">
                    <Statistics value="41" title="İL" />
                    <Statistics value="250" title="TƏDBİR" />
                    <Statistics value="185M" title="ZİYARƏTÇİ" />
                </div>
            </Section>
            <Section className="section h-100" id="section5">
                <Heading
                    title="REZERVASİYA"
                    desc="Öncədən rezerv et"
                    hyperlink="reserve-section"
                />
                <Reserve />
            </Section>
        </>
    );
};

export default Home;
