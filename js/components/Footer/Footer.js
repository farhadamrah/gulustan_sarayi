import React, { useState } from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Toast from "../Toast/Toast";
import { URLS } from "../../helpers/urls";
import axios from "axios";

const Footer = () => {
    const [newsletter, setNewsletter] = useState({ email: "", err: "" });
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(URLS.newsletter.base, {
                email: newsletter.email,
            });
            if (res.status !== 200) {
                setNewsletter((prev) => ({ ...prev, err: err.message }));
                Toast.error(
                    "Müraciətiniz zamanı xəta baş verdi, zəhmət olmasa bir də yoxlayasınız.",
                    "",
                    5
                );
                setNewsletter((prev) => ({
                    ...prev,
                    email: "",
                }));
                return;
            }
            Toast.success("Müraciətiniz qeydə alındı, təşəkkürlər", "", 5);
            setNewsletter((prev) => ({
                ...prev,
                email: "",
            }));
        } catch (err) {
            setNewsletter((prev) => ({ ...prev, err: err.message }));
            Toast.error(
                "Müraciətiniz zamanı xəta baş verdi, zəhmət olmasa bir də yoxlayasınız.",
                "",
                5
            );
            setNewsletter((prev) => ({
                ...prev,
                email: "",
            }));
        }
    };
    return (
        <footer>
            <div className="dots"></div>
            <div className="container">
                <div className="row general">
                    <div
                        className={`col-12 col-sm-8 col-md-6 col-lg-5 subscribe subscribe2`}
                    >
                        <form onSubmit={submitForm}>
                            <div className="input">
                                <input
                                    type="email"
                                    className="form"
                                    name="email"
                                    placeholder="Xəbərlərə abunə olun"
                                    value={newsletter.email}
                                    onChange={(e) =>
                                        setNewsletter((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    required
                                ></input>
                                <div className="input-button">
                                    <Button
                                        isVisible={true}
                                        text={
                                            window.innerWidth <= 992
                                                ? "SEND"
                                                : "GÖNDƏRİN"
                                        }
                                        color={`${
                                            window.innerWidth <= 992
                                                ? "transparent"
                                                : ""
                                        }`}
                                        className={`${
                                            window.innerWidth <= 992
                                                ? "mobile-btn"
                                                : ""
                                        }`}
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 subscribe socialmedia">
                        <div id="links">
                            <div>
                                <ul id="social-icons">
                                    <li className="icon">
                                        <i className="fab fa-facebook-f cursor"></i>
                                    </li>
                                    <li className="icon">
                                        <i className="fab fa-twitter cursor"></i>
                                    </li>
                                    <li className="icon">
                                        <i className="fab fa-youtube cursor"></i>
                                    </li>
                                    <li className="icon">
                                        <i className="fab fa-instagram cursor"></i>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <ul id="location">
                                    <li>Bakı, Azərbaycan</li>
                                    <li>İstiqlaliyyət küçəsi, AZ1001</li>
                                    <li>Telefon: +994557684545</li>
                                    <li>E-poçt: info@gulustansarayi.az </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4 col-md-6 col-lg-3 subscribe sitelogo">
                        <div id="logo-bottom">
                            <Link to="/">
                                <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    width="150"
                                    height="150"
                                    className="gulustan-logo"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container cristal">
                <div id="line">
                    <div className="diamonds">
                        <div className="diamond diamond1"></div>
                        <div className="diamond"></div>
                        <div className="diamond diamond1"></div>
                    </div>
                </div>
            </div>

            <div className="container end">
                <div className="row justify-content-between" id="copyright">
                    <div className="col-8 asd">
                        <p className="copyright">
                            Gülüstan sarayı 2021. Bütün hüquqlar qorunur.
                        </p>
                    </div>
                    <div className="col-4 asd">
                        <Link to="">
                            <p className="float-right privacy">
                                Məxfilik və şərtlər
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
