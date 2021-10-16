/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("sltider", {
    // Default module config.
    defaults: {
        name: null,
        number: null,
        direction: null,
        time: null,
    },
    getTemplate: function () {
        return "sltider.njk";
    },
    getTemplateData: function () {
        return this.config;
    },
    /**
     * Get the departures from a specific station
     *
     * @returns {string} the url for the specified coordinates
     */
     getURL() {
        let id = this.config.id;
        let maxJourneys = this.config.maxJourneys;
        let passlist = this.config.passlist;
        let products = this.config.products;
        let key = this.config.key;
        //return `https://api.resrobot.se/v2/depar/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
        return `https://api.resrobot.se/v2/departureBoard.json?key=${key}&id=${id}&maxJourneys=${maxJourneys}&passlist=${passlist}&products=${products}`;
    },
    
    /**
     * Implements method in interface for fetching a forecast.
     * Handling hourly forecast would be easy as not grouping by day but it seems really specific for one weather provider for now.
     */
     fetchDepartures() {
        this.fetchData(this.getURL())
            .then((data) => {
                this.setFetchedLocation(`(${coordinates.lat},${coordinates.lon})`);
                this.setWeatherForecast(weatherObjects);
            })
            .catch((error) => Log.error("Could not load data: " + error.message))
            .finally(() => this.updateAvailable());
    },
    fetchData: function (url, method = "GET", data = null) {
        return new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.open(method, url, true);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject(request);
                    }
                }
            };
            request.send();
        });
    }
});