import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import LazyBackground from "../../helpers/LazyBackground";

const NavMenu = ({ collapsed, handleCollapse, setCollapsed }) => {
    return (
        <LazyBackground
            className={`navMenu ${!collapsed ? "" : "active"}`}
            src="/images/navMenu-backImg.png"
        >
            <div className="overlay">
                <ul className="navMenu__list">
                    <li>
                        <HashLink
                            to="/#about-section"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            HAQQIMIZDA
                        </HashLink>
                    </li>
                    <li>
                        <HashLink
                            to="/#history-section"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            TARİXİMİZ
                        </HashLink>
                    </li>
                    <li>
                        <HashLink
                            to="/#reserve-section"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            REZERVASİYA
                        </HashLink>
                    </li>
                    <li>
                        <HashLink
                            to="/#events-section"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            TƏDBİRLƏR
                        </HashLink>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            ƏLAQƏ
                        </Link>
                    </li>
                </ul>

                <ul className="navMenu__social-links">
                    <li>
                        <i className="fab fa-facebook-f"></i>
                    </li>
                    <li>
                        <i className="fab fa-instagram"></i>
                    </li>
                    <li>
                        <i className="fab fa-twitter"></i>
                    </li>
                    <li>
                        <i className="fab fa-youtube"></i>
                    </li>
                </ul>
            </div>
        </LazyBackground>
    );
};

export default NavMenu;
