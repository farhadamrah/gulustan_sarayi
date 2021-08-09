import React from "react";
import { Link } from "react-router-dom";
// import az from "/images/az.png";
// import en from "/images/en.png";
// import ru from "/images/ru.png";

const Header = ({ handleCollapse, collapsed, style }) => {
    // const languages = [
    //     {
    //         flag: az,
    //         id: "az",
    //     },
    //     {
    //         flag: en,
    //         id: "en",
    //     },
    //     {
    //         flag: ru,
    //         id: "ru",
    //     },
    // ];

    return (
        <>
            <div className="header">
                <Link to="/">
                    <div className="header__left cursor">
                        {/* <h2 className={`header__left--logo ${style}`}>
                            <span>Gülüstan</span> <span> Sarayı</span>
                        </h2> */}
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            width="150"
                            height="150"
                            className="gulustan-logo"
                        />
                    </div>
                </Link>
                <div className="header__right">
                    {/* <div className="header__right--language"> */}
                    {/* <div className="dropdown"> */}
                    {/* <i
                                className="fas fa-globe"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            /> */}
                    {/* <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                            >
                                {languages.map((language) => (
                                    <li key={language.id}>
                                        <a className="dropdown-item" href="#">
                                            <img
                                                src={language.flag}
                                                alt="flag-img"
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul> */}
                    {/* </div> */}
                    {/* </div> */}
                    <div
                        className="header__right--menu"
                        onClick={handleCollapse}
                    >
                        <button
                            className={`hamburger hamburger--collapse ${
                                collapsed && "is-active"
                            }`}
                            type="button"
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
