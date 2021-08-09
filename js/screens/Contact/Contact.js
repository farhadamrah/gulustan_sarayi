import React, { useLayoutEffect, useState } from "react";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import HallsBanner from "../../components/HallsBanner/HallsBanner";
import axios from "axios";
import MetaTags from "react-meta-tags";
import { URLS } from "../../helpers/urls";
import Toast from "../../components/Toast/Toast";

const Contact = ({ handleCollapse, collapsed, setCollapsed }) => {
    const [meta, setMeta] = useState({});
    const [contact, setContact] = useState({
        user: {
            fullname: "",
            email: "",
            phone: "",
            content: "",
        },
        err: "",
    });
    useLayoutEffect(() => {
        const source = axios.CancelToken.source();
        const cancelToken = source.token;
        const fetchMeta = async () => {
            try {
                const res = await axios.get(URLS.meta.base + `${4}`, {
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

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(URLS.contact.base, contact.user);
            if (res.status !== 200) {
                setContact((prev) => ({ ...prev, err: err.message }));
                Toast.error(
                    "Müraciyətiniz zamanı xəta baş verdi, zəhmət olmasa bir də yoxlayasınız",
                    "",
                    5
                );
                setContact((prev) => ({
                    ...prev,
                    user: {
                        content: "",
                        email: "",
                        fullname: "",
                        phone: "",
                    },
                }));
                return;
            }
            Toast.success("Müraciyətiniz qeydə alındı, təşəkkurlər", "", 5);
            setContact((prev) => ({
                ...prev,
                user: {
                    content: "",
                    email: "",
                    fullname: "",
                    phone: "",
                },
            }));
        } catch (err) {
            setContact((prev) => ({ ...prev, err: err.message }));
            Toast.error(
                "Müraciyətiniz zamanı xəta baş verdi, zəhmət olmasa bir də yoxlayasınız",
                "",
                5
            );
            setContact((prev) => ({
                ...prev,
                user: {
                    content: "",
                    email: "",
                    fullname: "",
                    phone: "",
                },
            }));
        }
    };

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
            <Section className="section" id="contact-section1">
                <HallsBanner
                    handleCollapse={handleCollapse}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    info={{
                        photo: "halls_banner.png",
                        title: "ƏLAQƏ",
                    }}
                />
            </Section>
            <Section id="contact-section2">
                <div className="contact container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 contact-left">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Ad və Soyad"
                                        name="fullname"
                                        value={contact.user.fullname}
                                        onChange={(e) =>
                                            setContact((prev) => ({
                                                ...prev,
                                                user: {
                                                    ...prev.user,
                                                    fullname: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        placeholder="E-poçt"
                                        name="email"
                                        value={contact.user.email}
                                        onChange={(e) =>
                                            setContact((prev) => ({
                                                ...prev,
                                                user: {
                                                    ...prev.user,
                                                    email: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="tel"
                                        placeholder="Telefon"
                                        name="phone"
                                        value={contact.user.phone}
                                        onChange={(e) =>
                                            setContact((prev) => ({
                                                ...prev,
                                                user: {
                                                    ...prev.user,
                                                    phone: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        name="content"
                                        id=""
                                        cols="30"
                                        rows="10"
                                        placeholder="text"
                                        value={contact.user.content}
                                        onChange={(e) =>
                                            setContact((prev) => ({
                                                ...prev,
                                                user: {
                                                    ...prev.user,
                                                    content: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    ></textarea>
                                </div>
                                <Button text="GÖNDƏRİN" type="submit"></Button>
                            </form>
                        </div>
                        <div className="col-lg-6 col-md-12 contact-right">
                            <div className="text-center">
                                <h5>Adress:</h5>
                                <span>
                                    Baku, Azerbaijan AZ1001, 1 Istiglaliyyat
                                    Street
                                </span>
                                <h5>Phone:</h5>
                                <span>+99455768-45-45</span>
                                <h5>E-mail:</h5>
                                <span>info@gulustansarayi.az</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <Section className="map section" id="contact-section3 map">
                <div className="container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.2639830079306!2d49.8294554150448!3d40.35867062937194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307c32f464ffa1%3A0xce57cfb1f4641dcf!2zR3VsaXN0YW4gUGFsYWNlLCBCYWvEsSwg0JDQt9C10YDQsdCw0LnQtNC20LDQvQ!5e0!3m2!1sru!2s!4v1479470305981&language=az"
                        width="100%"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        style={{ filter: "invert(1) hue-rotate(180deg)" }}
                    ></iframe>
                </div>
            </Section>
        </>
    );
};

export default Contact;
