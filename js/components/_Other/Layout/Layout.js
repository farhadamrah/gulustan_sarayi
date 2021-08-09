import React from "react";
import Footer from "../../Footer/Footer";

const Layout = ({ children }) => {
    return (
        <>
            <main id="main">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
