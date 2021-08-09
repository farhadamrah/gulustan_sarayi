import React, { useState, Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { URLS } from "../../helpers/urls";
import axios from "axios";
import { useStateValue } from "../StateManagement/StateProvider";
import Spinner from "../Spinner/Spinner";
import Fallback from "./Fallback/Fallback";
const About = React.lazy(() => import("../../screens/About/About"));
const Home = React.lazy(() => import("../../screens/Home/Home"));
const Halls = React.lazy(() => import("../../screens/Halls/Halls"));
const Events = React.lazy(() => import("../../screens/Events/Event"));
const Error404 = React.lazy(() => import("../../screens/Error404/Error404"));
const Contact = React.lazy(() => import("../../screens/Contact/Contact"));

export default function Routes() {
    const [collapsed, setCollapsed] = useState(false);
    const [state, dispatch] = useStateValue();

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (!state.halls.length) {
            (async () => {
                const res = await axios.get(URLS.halls.base);
                dispatch({ type: "GET_HALLS", halls: res.data });
                return res;
            })();
        }
    }, []);

    useEffect(() => {
        if (!state.events.length) {
            (async () => {
                const res = await axios.get(URLS.events.base);
                dispatch({ type: "GET_EVENTS", events: res.data });
                return res;
            })();
        }
    }, []);

    return (
        <Switch>
            <Route exact path="/about">
                <Suspense
                    fallback={
                        <Fallback>
                            <Spinner />
                        </Fallback>
                    }
                >
                    <About
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        handleCollapse={handleCollapse}
                    />
                </Suspense>
            </Route>
            <Route exact path="/halls/:type">
                <Suspense
                    fallback={
                        <Fallback>
                            <Spinner />
                        </Fallback>
                    }
                >
                    <Halls
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        handleCollapse={handleCollapse}
                    />
                </Suspense>
            </Route>
            <Route exact path="/events/:type">
                <Suspense
                    fallback={
                        <Fallback>
                            <Spinner />
                        </Fallback>
                    }
                >
                    <Events
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        handleCollapse={handleCollapse}
                    />
                </Suspense>
            </Route>
            <Route exact path="/contact">
                <Suspense
                    fallback={
                        <Fallback>
                            <Spinner />
                        </Fallback>
                    }
                >
                    <Contact
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        handleCollapse={handleCollapse}
                    />
                </Suspense>
            </Route>
            <Route exact path="/">
                <Suspense
                    fallback={
                        <Fallback>
                            <Spinner />
                        </Fallback>
                    }
                >
                    <Home
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        handleCollapse={handleCollapse}
                    />
                </Suspense>
            </Route>
            <Route>
                <Suspense
                    fallback={
                        <Fallback>
                            <Spinner />
                        </Fallback>
                    }
                >
                    <Error404
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        handleCollapse={handleCollapse}
                    />
                </Suspense>
            </Route>
        </Switch>
    );
}
