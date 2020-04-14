import FiveDayForecast from "./FiveDayForecast.js";
/**
 * Třída pro získání a práci s daty, která získala z dané URL
 */
export default class WeatherAppModel {
    //#endregion Properties
    //#region Constructors
    constructor(url, cityName, units = "metric") {
        this._url = url;
        this._cityName = cityName;
        this._units = units;
    }
    //#endregion Fields
    //#region Properties
    get forecast() {
        return this._forecast;
    }
    set url(url) {
        this._url = url;
    }
    set cityName(cityName) {
        this._cityName = cityName;
    }
    //#endregion Constructors
    //#region Methods
    /**
     * Získá a nastaví předpověď počasí na 5 dní pro dané město a jednotku, ve které se zobrazuje teplota
     */
    async initialize() {
        const urlWithCityNameAndUnits = this._url.concat("&q=", this._cityName, "&units=", this._units);
        const forecast = await this.fetchForecast(urlWithCityNameAndUnits);
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
