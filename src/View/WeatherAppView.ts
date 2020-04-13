import { ThreeHourForecast } from "../Models/ThreeHourForecast.js";

/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _dataToView: Array<ThreeHourForecast>;
  //#endregion Fields

  //#region Constructors
  constructor(dataToView: Array<ThreeHourForecast>) {
    this._dataToView = dataToView;
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Metoda vykreslí předaná data
   */
  public render() {
    const listDiv = document.getElementById("list");
    const ulNode = document.createElement("ul");

    this._dataToView.forEach((forecast) => {
      const liNode = document.createElement("li");
      const textNode = document.createTextNode(
        `Den: ${forecast.getDayName()} je nejvyšší teplota dne ${forecast.temp}`
      );
      liNode.appendChild(textNode);
      ulNode.appendChild(liNode);
    });

    listDiv.appendChild(ulNode);
  }
  //#endregion Methods
}
