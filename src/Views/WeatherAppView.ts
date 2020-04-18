import { ThreeHourForecast } from "../Models/ThreeHourForecast.js";
import { City } from "../Models/City.js";
import WeatherAppCard from "./CustomElements/WeatherAppCard.js";

/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _form: HTMLFormElement;
  private _cityNameInput: HTMLInputElement;
  private _searchButton: HTMLButtonElement;

  private _divElement: HTMLDivElement;
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

    window.customElements.define("weather-app-card", WeatherAppCard);
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Vykreslí předpovědi pro zadané město
   * @param {Array<ThreeHourForecast>} forecasts - pole předpovědí, které se mají vykreslit
   * @param {City} city - město, pro které se předpověď vykresluje
   */
  public renderForecastsForCity(forecasts: Array<ThreeHourForecast>, city: City) {
    while (this._divElement.firstChild) {
      this._divElement.removeChild(this._divElement.firstChild);
    }

    const h1Node = document.createElement("h1");
    const h1TextNode = document.createTextNode(city.name);
    h1Node.appendChild(h1TextNode);
    this._divElement.appendChild(h1Node);

    forecasts.forEach((forecast) => {
      const weatherAppCard = document.createElement("weather-app-card");
      const daySlot = document.createElement("div");
      daySlot.setAttribute("slot", "day");
      daySlot.innerHTML = forecast.getDayName();

      const tempSlot = document.createElement("div");
      tempSlot.setAttribute("slot", "temp");
      tempSlot.innerHTML = `${forecast.temp}`;

      const descSlot = document.createElement("div");
      descSlot.setAttribute("slot", "description");
      descSlot.innerHTML = `${forecast.weatherDescription}`;

      const windSlot = document.createElement("div");
      windSlot.setAttribute("slot", "wind");
      windSlot.innerHTML = `${forecast.windSpeed}`;

      weatherAppCard.append(daySlot, tempSlot, descSlot, windSlot);
      this._divElement.appendChild(weatherAppCard);
    });
  }

  /**
   * Odchytí událost vyhledání názvu města a nový název pošle do WeatherAppControlleru
   * @param handler - metoda WeatherAppControlleru, která si na základě názvu města vyžádá nová data a překreslí UI
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
