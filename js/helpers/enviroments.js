export const ENVIROMENTS = {
    local: "Local",
    development: "Development",
    test: "Test",
    production: "Production",
};

// without protocol or any slash
export const ENVIROMENT_URLS = {
    local: "localhost:8000",
    development: "dev.gulustansarayi.az",
    test: "test.gulustansarayi.az",
    production: "gulustansarayi.az",
};

export default class Environment {
    static env = this.getEnvironmentFromUrl();

    static getEnvironmentFromUrl() {
        if (window.location.hostname === ENVIROMENT_URLS.production) {
            return ENVIROMENTS.production;
        } else if (window.location.hostname === ENVIROMENT_URLS.local) {
            return ENVIROMENTS.local;
        } else if (window.location.hostname === ENVIROMENT_URLS.test) {
            return ENVIROMENTS.test;
        } else {
            return ENVIROMENTS.development;
        }
    }

    static isLocal() {
        return this.env === ENVIROMENTS.local;
    }

    static isDevelopment() {
        return this.env === ENVIROMENTS.development;
    }

    static isTest() {
        return this.env === ENVIROMENTS.test;
    }

    static isDemo() {
        return this.env === ENVIROMENTS.demo;
    }

    static isProduction() {
        return this.env === ENVIROMENTS.production;
    }
}
