import { ThreeHourForecast } from "../Models/ThreeHourForecast.js";
import { City } from "../Models/City.js";
import FiveDayForecast from "../Models/FiveDayForecast.js";

/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _divElement: HTMLDivElement;
  private _cityNameInput: HTMLInputElement;
  private _searchButton: HTMLButtonElement;

  private _form: HTMLFormElement;
  //#endregion Fields

  //#region Properties
  private get cityNameInput() {
    return this._cityNameInput.value;
  }
  //#endregion Properties

  //#region Constructors
  constructor() {
    this._form = document.createElement("form");

    this._cityNameInput = document.createElement("input");
    this._cityNameInput.type = "text";
    this._cityNameInput.placeholder = "Your city name";

    this._searchButton = document.createElement("button");
    this._searchButton.type = "submit";
    this._searchButton.textContent = "Search";

    this._form.appendChild(this._cityNameInput);
    this._form.appendChild(this._searchButton);

    this._divElement = document.createElement("div");

    document.getElementsByTagName("body")[0].appendChild(this._form);
    document.getElementsByTagName("body")[0].appendChild(this._divElement);
  }
  //#endregion Constructors

  //#region Methods
  public renderForecastsForCity(forecasts: Array<ThreeHourForecast>, city: City) {
    while (this._divElement.firstChild) {
      this._divElement.removeChild(this._divElement.firstChild);
    }

    const h1Node = document.createElement("h1");
    const h1TextNode = document.createTextNode(city.name);
    h1Node.appendChild(h1TextNode);
    this._divElement.appendChild(h1Node);

    const ulNode = document.createElement("ul");

    forecasts.forEach((forecast) => {
      const liNode = document.createElement("li");
      const textNode = document.createTextNode(
        `Den: ${forecast.getDayName()} je nejvyšší teplota dne ${forecast.temp}`
      );
      liNode.appendChild(textNode);
      ulNode.appendChild(liNode);
    });

    this._divElement.appendChild(ulNode);
  }

  /**
   * Odchytí událost změny názvu města a pošle ji do WeatherAppControlleru
   * @param handler metoda WeatherAppControlleru, která si vyžádá nová data a překreslí View
   */
  public bindSearchCity(handler) {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.cityNameInput) {
        handler(this.cityNameInput);
      }
    });
  }
  //#endregion Methods
}
