import WeatherAppModel from "../Models/WeatherAppModel.js";
import WeatherAppView from "../View/WeatherAppView.js";

/**
 * Třída zajíšťující komunikaci mezi daty a UI aplikace
 */
export default class WeatherAppController {
  //#region Fields
  private _model: WeatherAppModel;
  private _view: WeatherAppView;
  //#endregion Fields

  //#region Properties
  public get model() {
    return this._model;
  }

  public get view() {
    return this._view;
  }
  //#endregion Properties

  //#region Constructors
  constructor(model: WeatherAppModel) {
    this._model = model;
    this._view = new WeatherAppView(
      this._model.forecast.getForecastsWithHighestTempForEveryDay(),
      this._model.forecast.city
    );
  }
  //#endregion Constructors
}
