import { ThreeHourForecast } from "../Models/ThreeHourForecast.js";
import { City } from "../Models/City.js";
import WeatherAppCard from "./CustomElements/WeatherAppCard.js";
import WeatherAppSearch from "./CustomElements/WeatherAppSearch.js";

/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _weatherAppSearch: HTMLElement;

  private _divElement: HTMLDivElement;
  //#endregion Fields

  //#region Constructors
  constructor() {
    window.customElements.define("weather-app-card", WeatherAppCard);
    window.customElements.define("weather-app-search", WeatherAppSearch);

    this._weatherAppSearch = document.createElement("weather-app-search");
    this._divElement = document.createElement("div");

    document.getElementsByTagName("body")[0].append(this._weatherAppSearch);
    document.getElementsByTagName("body")[0].appendChild(this._divElement);
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
    this._weatherAppSearch.addEventListener("build", (event: CustomEvent) => {
      event.preventDefault();
      if (event.detail) {
        handler(event.detail);
      }
    });
  }
  //#endregion Methods
}
