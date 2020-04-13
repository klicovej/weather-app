import WeatherAppView from "../View/WeatherAppView.js";
/**
 * Třída zajíšťující komunikaci mezi daty a UI aplikace
 */
export default class WeatherAppController {
    //#endregion Properties
    //#region Constructors
    constructor(model) {
        this._model = model;
        this._view = new WeatherAppView(this._model.forecast.getForecastsWithHighestTempForEveryDay(), this._model.forecast.city);
        //this.view.bindAddTodo(this.handleAddTodo.bind(this))
        this._view.bindSearchCity(this.handleChangeCity.bind(this));
    }
    //#endregion Fields
    //#region Properties
    get model() {
        return this._model;
    }
    get view() {
        return this._view;
    }
    //#endregion Constructors
    //#region Methods
    async handleChangeCity(cityName) {
        console.log("Handler v controlleru " + cityName);
        this._model.url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4a710277b41d7da791e44bf515bac6f7&units=metric`;
        await this._model.initialize();
        console.log("Aktualni mesto: " + this._model.forecast.city.name);
        this._view.render(this._model.forecast.getForecastsWithHighestTempForEveryDay(), this._model.forecast.city);
    }
}
