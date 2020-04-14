import FiveDayForecast from "./FiveDayForecast.js";
/**
 * Třída pro získání a práci s daty, která získala z dané URL
 */
export default class WeatherAppModel {
    //#endregion Properties
    //#region Constructors
    constructor(url) {
        this._url = url;
    }
    //#endregion Fields
    //#region Properties
    get forecast() {
        return this._forecast;
    }
    set url(url) {
        this._url = url;
    }
    //#endregion Constructors
    //#region Methods
    /**
     * Získá a nastaví předpověď počasí na 5 dní
     */
    async initialize() {
        const forecast = await this.fetchForecast(this._url);
        this._forecast = new FiveDayForecast(forecast);
    }
    /**
     * Načte předpověd z dané url
     * @param {adresa, ze které se načítají data} url
     * @returns pole objektů s údaji o předpovědi
     */
    async fetchForecast(url) {
        const response = await fetch(url);
        const forecast = await response.json();
        return forecast;
    }
}
