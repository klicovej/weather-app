import FiveDayForecast from "./FiveDayForecast.js";

/**
 * Třída pro získání a práci s daty, která získala z dané URL
 */
export default class WeatherAppModel {
  //#region Fields
  private _url: string;
  private _cityName: string;
  private _units: string;
  private _forecast: FiveDayForecast;
  //#endregion Fields

  //#region Properties
  get forecast() {
    return this._forecast;
  }

  set cityName(cityName: string) {
    this._cityName = cityName;
  }
  //#endregion Properties

  //#region Constructors
  constructor(url: string, cityName: string, units = "metric") {
    this._url = url;
    this._cityName = cityName;
    this._units = units;
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Získá a nastaví předpověď počasí na 5 dní pro dané město a jednotku, ve které se zobrazuje teplota
   */
  public async initialize() {
    const urlWithCityNameAndUnits = this._url.concat("&q=", this._cityName, "&units=", this._units);
    const forecast = await this.fetchForecast(urlWithCityNameAndUnits);
    this._forecast = new FiveDayForecast(forecast);
  }

  /**
   * Načte předpověd z dané url
   * @param {adresa, ze které se načítají data} url
   * @returns pole objektů s údaji o předpovědi
   */
  private async fetchForecast(url: string) {
    const response = await fetch(url);
    const forecast = await response.json();
    return forecast;
  }
  //#endregion Methods
}
