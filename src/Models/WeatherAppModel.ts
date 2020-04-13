import FiveDayForecast from "./FiveDayForecast.js";

/**
 * Třída pro získání a práci s daty, která získala z dané URL
 */
export default class WeatherAppModel {
  //#region Fields
  private _url: string;
  private _forecast: FiveDayForecast;
  //#endregion Fields

  //#region Properties
  get forecast() {
    return this._forecast;
  }

  set url(url: string) {
    this._url = url;
  }
  //#endregion Properties

  //#region Constructors
  constructor(url: string) {
    this._url = url;
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Načte do property '_forecast' předpověď na 5 dní
   */
  public async initialize() {
    const forecast = await this.fetchForecast(this._url);
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
