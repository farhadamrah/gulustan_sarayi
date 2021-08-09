import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./_Other/Layout/Layout";
import Routes from "./_Other/Routes";
import ScrollToTop from "../helpers/ScrollToTop";
import { StateProvider, useStateValue } from "./StateManagement/StateProvider";
import { initialState, reducer } from "./StateManagement/reducer";
import { URLS } from "../helpers/urls";
import { Toasts } from "./Toast/Toast";
function App() {
    return (
        <Router>
            <Fragment>
                <ScrollToTop />
                <Layout>
                    <Toasts />
                    <Routes />
                </Layout>
            </Fragment>
        </Router>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>,
        document.getElementById("root")
    );
}
