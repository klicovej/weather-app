import WeatherAppView from "../View/WeatherAppView.js";
/**
 * Třída zajíšťující komunikaci mezi daty a UI aplikace
 */
export default class WeatherAppController {
    //#endregion Properties
    //#region Constructors
    constructor(model) {
        this._model = model;
        this._view = new WeatherAppView(this._model.forecast.getForecastsWithHighestTempForEveryDay());
    }
    //#endregion Fields
    //#region Properties
    get model() {
        return this._model;
    }
    get view() {
        return this._view;
    }
}
