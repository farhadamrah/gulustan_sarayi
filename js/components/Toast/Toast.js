import React, { useEffect, useState } from "react";
import "./Toast.scss";

export function Toasts() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        function onToastReceived(event) {
            const toast = event.detail;

            if (toast.delay > 0) {
                toast.timer = setTimeout(() => {
                    onClose(toast.id);
                }, toast.delay * 1000);
            }

            setToasts((prevToasts) => [toast, ...prevToasts]);
        }

        // Bind the event listener
        document.addEventListener("toastDispatched", onToastReceived);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("toastDispatched", onToastReceived);
        };
    }, []);

    function onClose(id, timer) {
        // toasts here has same value as it had when setTimeout set, so use prevToasts to get the up-to-date value
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));

        // in case delayed toast was closed manually before timer is up, clear timer so that close function won't be called for an already deleted toast
        if (timer) {
            clearTimeout(timer);
        }
    }

    function onStopTimer(id, timer) {
        clearTimeout(timer);

        setToasts((prevToasts) => {
            return prevToasts.map((toast) => {
                if (toast.id === id) {
                    toast.delay = null;
                    toast.timer = null;
                }
                return toast;
            });
        });
    }

    if (toasts && toasts.length) {
        return (
            <div className="toast-container position-fixed top-0 end-0 p-3">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        onClose={onClose}
                        onStopTimer={onStopTimer}
                        {...toast}
                    />
                ))}
            </div>
        );
    } else return null;
}

function ToastItem(props) {
    const [delay, setDelay] = useState(props.delay);

    let interval;
    useEffect(() => {
        if (!interval && delay > 0) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            interval = setInterval(() => {
                setDelay((delay) => delay - 1);
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [props.delay]);

    function onStop() {
        clearInterval(interval);
        interval = null;
        props.onStopTimer(props.id, props.timer);
    }

    function getBody() {
        if (Array.isArray(props.body)) {
            return (
                <ul>
                    {props.body.map((b, index) => (
                        <li key={index}>{b}</li>
                    ))}
                </ul>
            );
        }
        return props.body;
    }

    return (
        <div className="toast">
            <div className="toast-header">
                <div
                    className={"d-inline rounded-circle me-2 bg-" + props.type}
                ></div>
                <strong className="me-auto">{props.title}</strong>
                {props.delay > 0 && (
                    <>
                        <small onClick={() => onStop()} className="me-1 stop">
                            Stop
                        </small>
                        <small>{delay < 2 ? "Closing" : delay}</small>
                    </>
                )}
                <button
                    onClick={() => props.onClose(props.id, props.timer)}
                    type="button"
                    className="btn-close"
                ></button>
            </div>
            <div className="toast-body">{getBody()}</div>
        </div>
    );
}

// Will dispatch a custom event which will be listening by <Toasts/> component.
// Delay is the duration toast will be displayed and closed automatically. Default value is 5 seconds. Null or 0 means no delay at all.
// Body can be string/jsx or an array of strings/jsx
export default class Toast {
    static fire(title, body, type, delay = 5) {
        const detail = {
            id: parseInt(Date.now()),
            title: title || "",
            body: body || "",
            type: type || "secondary",
            delay: !delay ? 0 : delay,
        };

        var event = new CustomEvent("toastDispatched", { detail });
        document.dispatchEvent(event);
        return detail.id;
    }

    static error(body, title, delay) {
        this.fire(title || "Xəta", body, "danger", delay);
    }

    static success(body, title, delay) {
        this.fire(title || "Tamamlandı", body, "success", delay);
    }

    static info(body, title, delay) {
        this.fire(title || "Tamamlandı", body, "info", delay);
    }
}
