import WeatherAppModel from "../Models/WeatherAppModel";
import WeatherAppView from "../View/WeatherAppView";

/**
 * Třída zajíšťující komunikaci mezi daty a UI aplikace
 */
export default class WeatherAppController {
  //#region Fields
  private _model: WeatherAppModel;
  private _view: WeatherAppView;
  //#endregion Fields

  //#region Constructors
  constructor(model: WeatherAppModel, view: WeatherAppView) {
    this._model = model;
    this._view = view;

    this._view.bindSearchCity(this.handleSearchCity.bind(this));
    this._view.renderForecastsForCity(
      this._model.forecast.getForecastsWithHighestTempForEveryDay(),
      this._model.forecast.city
    );
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Pro zadaný název města vyhledá předpověď a překreslí podle ní UI
   * @param {string} cityName - název města, pro které se má zjistit předpověď
   */
  public async handleSearchCity(cityName: string) {
    console.log("Handler v controlleru " + cityName);

    this._model.cityName = cityName;
    await this._model.initialize();
    console.log("Aktualni mesto: " + this._model.forecast.city.name);

    this._view.renderForecastsForCity(
      this._model.forecast.getForecastsWithHighestTempForEveryDay(),
      this._model.forecast.city
    );
  }
  //#endregion Methods
}
