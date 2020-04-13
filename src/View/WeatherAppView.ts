import { ThreeHourForecast } from "../Models/ThreeHourForecast.js";
import { City } from "../Models/City.js";

/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _dataToView: Array<ThreeHourForecast>;
  private _city: City;
  //#endregion Fields

  //#region Constructors
  constructor(dataToView: Array<ThreeHourForecast>, city: City) {
    this._dataToView = dataToView;
    this._city = city;
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Metoda vykreslí předaná data
   */
  public render() {
    const listDiv = document.getElementById("list");
    const h1Node = document.createElement("h1");
    const h1TextNode = document.createTextNode(this._city.name);
    h1Node.appendChild(h1TextNode);
    listDiv.appendChild(h1Node);

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
