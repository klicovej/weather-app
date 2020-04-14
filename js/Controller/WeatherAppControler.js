/**
 * Třída zajíšťující komunikaci mezi daty a UI aplikace
 */
export default class WeatherAppController {
    //#endregion Fields
    //#region Constructors
    constructor(model, view) {
        this._model = model;
        this._view = view;
        this._view.bindSearchCity(this.handleSearchCity.bind(this));
        this._view.renderForecastsForCity(this._model.forecast.getForecastsWithHighestTempForEveryDay(), this._model.forecast.city);
    }
    //#endregion Constructors
    //#region Methods
    /**
     * Pro zadaný název města vyhledá předpověď a překreslí podle ní UI
     * @param {string} cityName - název města, pro které se má zjistit předpověď
     */
    async handleSearchCity(cityName) {
        console.log("Handler v controlleru " + cityName);
        this._model.url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4a710277b41d7da791e44bf515bac6f7&units=metric`;
        await this._model.initialize();
        console.log("Aktualni mesto: " + this._model.forecast.city.name);
        this._view.renderForecastsForCity(this._model.forecast.getForecastsWithHighestTempForEveryDay(), this._model.forecast.city);
    }
}
