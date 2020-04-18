import { ThreeHourForecast } from "../Models/ThreeHourForecast.js";
import { City } from "../Models/City.js";
import WeatherAppCard from "./CustomElements/WeatherAppCard.js";
import WeatherAppSearch from "./CustomElements/WeatherAppSearch.js";
import WeatherApp from "./CustomElements/WeatherApp.js";

/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _weatherApp: HTMLElement;
  //#endregion Fields

  //#region Constructors
  constructor() {
    window.customElements.define("weather-app", WeatherApp);
    window.customElements.define("weather-app-search", WeatherAppSearch);
    window.customElements.define("weather-app-card", WeatherAppCard);

    this._weatherApp = document.createElement("weather-app");
    document.getElementsByTagName("body")[0].append(this._weatherApp);
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Vykreslí předpovědi pro zadané město
   * @param {Array<ThreeHourForecast>} forecasts - pole předpovědí, které se mají vykreslit
   * @param {City} city - město, pro které se předpověď vykresluje
   */
  public renderForecastsForCity(forecasts: Array<ThreeHourForecast>, city: City) {
    // Smaže všechny předcházející elementy
    while (this._weatherApp.firstChild) {
      this._weatherApp.removeChild(this._weatherApp.firstChild);
    }

    // Vytvoří element s názvem města
    const citySlot = document.createElement("div");
    citySlot.setAttribute("slot", "city");
    citySlot.innerHTML = city.name;
    this._weatherApp.appendChild(citySlot);

    // Vytvoří elementy <weather-app-card> zobrazující předpověd pro jednotlivé dny
    const cardsSlot = document.createElement("div");
    cardsSlot.setAttribute("slot", "weather-app-cards");
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
      cardsSlot.appendChild(weatherAppCard);
    });

    this._weatherApp.appendChild(cardsSlot);
  }

  /**
   * Odchytí událost vyhledání názvu města a nový název pošle do WeatherAppControlleru
   * @param handler - metoda WeatherAppControlleru, která si na základě názvu města vyžádá nová data a překreslí UI
   */
  public bindSearchCity(handler) {
    this._weatherApp.addEventListener("appSubmit", (event: CustomEvent) => {
      event.preventDefault();
      if (event.detail) {
        handler(event.detail);
      }
    });
  }
  //#endregion Methods
}
