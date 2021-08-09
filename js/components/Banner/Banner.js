import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Header from "../Header/Header";
import NavMenu from "../NavMenu/NavMenu";
import LazyBackground from "../../helpers/LazyBackground";
const Banner = ({ handleCollapse, collapsed, setCollapsed }) => {
    return (
        <LazyBackground
            className="banner-container"
            src="/images/Head_Banner.png"
        >
            <div
                className={collapsed ? "backdrop" : "none"}
                onClick={() => setCollapsed(!collapsed)}
            ></div>

            <Header handleCollapse={handleCollapse} collapsed={collapsed} />
            <NavMenu
                collapsed={collapsed}
                handleCollapse={handleCollapse}
                setCollapsed={setCollapsed}
            />

            <div className="banner-box" id="about-section">
                <LazyBackground
                    className="banner-box__left"
                    src="/images//about.png"
                ></LazyBackground>
                <div className="banner-box__right">
                    <h1 className="title">{"Tarİxİn bİr parçası olun"}</h1>

                    {/* <h2>
                        {
                            "İllər boyu önəmli hadisələrə ev sahibliyi edən Gülüstan Sarayı sizin də tədbirlərinizi bu tarixin ayrılmaz bir hissəsinə çevirəcək"
                        }
                    </h2> */}
                    <p>
                        "İllər boyu önəmli hadisələrə ev sahibliyi edən Gülüstan
                        Sarayı sizin də tədbirlərinizi bu tarixin ayrılmaz bir
                        hissəsinə çevirəcək"
                        <br />
                        <br />
                        "Gülüstan" sarayı ümummilli lider Heydər Əlirza oğlu
                        Əliyevin təşəbbüsü ilə "Bakı Dövlət Layihə" İnstitutu
                        tərəfindən hazırlanmış layihə əsasında 1979-1980-ci
                        illərdə inşa edilmişdir.
                    </p>
                    <div className="box-btn">
                        <Link to="/about">
                            <Button
                                text="ƏTRAFLI"
                                color="#000"
                                backgroundColor="#ffffff"
                                fontWeight="600"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </LazyBackground>
    );
};

export default Banner;
