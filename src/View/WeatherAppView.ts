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
  private _cityNameInput: HTMLInputElement;
  private _searchButton: HTMLButtonElement;
  private _searchDivElement: HTMLDivElement;
  //#endregion Fields

  //#region Properties
  private get __cityNameInput() {
    return this._cityNameInput.value;
  }
  //#endregion Properties

  //#region Constructors
  constructor(dataToView: Array<ThreeHourForecast>, city: City) {
    this._dataToView = dataToView;
    this._city = city;

    this._searchDivElement = document.createElement("div");
    this._cityNameInput = document.createElement("input");
    this._cityNameInput.placeholder = "Your city name";
    this._cityNameInput.type = "text";
    this._cityNameInput.id = "city-name";
    this._searchDivElement.appendChild(this._cityNameInput);

    this._searchButton = document.createElement("button");
    this._searchButton.type = "Button";
    this._searchButton.textContent = "Search";
    this._searchButton.id = "search-button";
    this._searchDivElement.appendChild(this._searchButton);

    this._divElement = document.createElement("div");

    document.getElementsByTagName("body")[0].appendChild(this._searchDivElement);
    document.getElementsByTagName("body")[0].appendChild(this._divElement);

    this.render(this._dataToView, this._city);
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Vykreslí předaná data
   */
  public render(dataToView: Array<ThreeHourForecast>, city: City) {
    while (this._divElement.firstChild) {
      this._divElement.removeChild(this._divElement.firstChild);
    }

    const h1Node = document.createElement("h1");
    const h1TextNode = document.createTextNode(city.name);
    h1Node.appendChild(h1TextNode);
    this._divElement.appendChild(h1Node);

    const ulNode = document.createElement("ul");

    dataToView.forEach((forecast) => {
      const liNode = document.createElement("li");
      const textNode = document.createTextNode(
        `Den: ${forecast.getDayName()} je nejvyšší teplota dne ${forecast.temp}`
      );
      liNode.appendChild(textNode);
      ulNode.appendChild(liNode);
    });

    this._divElement.appendChild(ulNode);
  }

  public bindSearchCity(handler) {
    this._searchButton.addEventListener("click", (event) => {
      if (this.__cityNameInput) {
        console.log("Bind ve View: " + this.__cityNameInput);
        handler(this.__cityNameInput);
      }
    });
  }
  //#endregion Methods
}
