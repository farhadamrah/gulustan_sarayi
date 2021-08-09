import Environment from "./enviroments";

let urls = {
    halls: {
        base: "get/halls",
        inner: "get/hall/inner",
    },
    events: {
        base: "get/events",
        inner: "get/event/inner",
    },
    history: {
        base: "get/histories",
    },
    meta: {
        base: "get/meta",
    },
    about: {
        base: "get/about",
    },
    contact: {
        base: "add/contact",
    },
    newsletter: {
        base: "add/newsletter",
    },
    reservation: {
        base: "add/reservation",
    },
};

const root = Environment.isLocal() ? "localhost:8000" : window.location.origin;

function addRootToUrls(obj) {
    Object.entries(obj).forEach(function ([key, value]) {
        if (value) {
            if (typeof value === "object") return addRootToUrls(value);
            else obj[key] = `${root}/api/${value}/`;
        }
    });
    return obj;
}

export const URLS = addRootToUrls(urls);
