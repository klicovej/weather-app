import WeatherAppModel from "../Models/WeatherAppModel";
import WeatherAppView from "../Views/WeatherAppView";

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
    this._view.bindGetGeolocation(this.handleGetGeolocation.bind(this));

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
    this._model.cityName = cityName;
    await this._model.initialize();

    this._checkForecastStatusAndRenderUI(cityName);
  }

  /**
   * Zjistí aktuální polohu a vyhledá podle ní předpověď a následně překreslí UI.
   * V případě, že se poloha nepodaří zjistit je vypsána chybová hláška.
   */
  public handleGetGeolocation() {
    if (!navigator.geolocation) {
      this._view.removeCityNameAndForecasts();
      this._view.createErrorMessage("Ve vašem prohlížeči není zjištění aktuální polohy podporováno.");
    } else {
      navigator.geolocation.getCurrentPosition(this._success.bind(this), this._error.bind(this));
    }
  }

  /**
   * V případě nalezení aktuální polohy vyvolá zjištění předpovědi
   * @param position objekt typu GeolocationPosition
   */
  private async _success(position) {
    this._model.latitude = position.coords.latitude;
    this._model.longitude = position.coords.longitude;

    await this._model.initialize(false);

    this._checkForecastStatusAndRenderUI();
  }

  /**
   * V případě nenalezení aktuální polohy nastaví chybovou hlášku
   */
  private _error() {
    this._view.removeCityNameAndForecasts();
    this._view.createErrorMessage("Pro vaši aktuální polohu se nepodařilo najít předpověď.");
  }

  /**
   * Ověří, zda byla nalezena předpověď, pokud ano překreslí UI, pokud ne zobrazí chybovou zprávou
   */
  private _checkForecastStatusAndRenderUI(cityName = "") {
    if (this._model.forecast.cod === "200") {
      this._view.renderForecastsForCity(
        this._model.forecast.getForecastsWithHighestTempForEveryDay(),
        this._model.forecast.city
      );
    } else {
      this._view.removeCityNameAndForecasts();
      this._view.createErrorMessage(`Pro město s názvem '${cityName}' se nepodařilo najít předpověď.`);
    }
  }
  //#endregion Methods
}
