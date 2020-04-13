import { ThreeHourForecast } from "../Models/ThreeHourForecast.js";
import { City } from "../Models/City.js";

/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _dataToView: Array<ThreeHourForecast>;
  private _city: City;

  private _divElement: HTMLDivElement;
  //#endregion Fields

  //#region Constructors
  constructor(dataToView: Array<ThreeHourForecast>, city: City) {
    this._dataToView = dataToView;
    this._city = city;

    this._divElement = document.createElement("div");

    const h1Node = document.createElement("h1");
    const h1TextNode = document.createTextNode(this._city.name);
    h1Node.appendChild(h1TextNode);
    this._divElement.appendChild(h1Node);

    const cityNameInput = document.createElement("input");
    cityNameInput.placeholder = "Your city name";
    cityNameInput.type = "text";
    cityNameInput.id = "city-name";
    this._divElement.appendChild(cityNameInput);

    const searchButton = document.createElement("button");
    searchButton.type = "Button";
    searchButton.textContent = "Search";
    searchButton.id = "search-button";
    this._divElement.appendChild(searchButton);

    document.getElementsByTagName("body")[0].appendChild(this._divElement);

    this._render();
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Vykreslí předaná data
   */
  private _render() {
    const ulNode = document.createElement("ul");

    this._dataToView.forEach((forecast) => {
      const liNode = document.createElement("li");
      const textNode = document.createTextNode(
        `Den: ${forecast.getDayName()} je nejvyšší teplota dne ${forecast.temp}`
      );
      liNode.appendChild(textNode);
      ulNode.appendChild(liNode);
    });

    this._divElement.appendChild(ulNode);
  }
  //#endregion Methods
}
