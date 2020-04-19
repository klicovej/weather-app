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

    this._weatherApp.addEventListener("emptyInput", (event: CustomEvent) => {
      this._removeCityNameAndForecasts();
    });
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Vykreslí předpovědi pro zadané město
   * @param {Array<ThreeHourForecast>} forecasts - pole předpovědí, které se mají vykreslit
   * @param {City} city - město, pro které se předpověď vykresluje
   */
  public renderForecastsForCity(forecasts: Array<ThreeHourForecast>, city: City) {
    // Odstraní název města a předpovědi
    this._removeCityNameAndForecasts();

    // Vytvoří element s názvem města a připojí ho k <weather-app>
    const cityTextNode = document.createElement("textNode");
    cityTextNode.innerText = `${city.name}`;
    cityTextNode.setAttribute("slot", "city");
    this._weatherApp.appendChild(cityTextNode);

    // Vytvoří elementy <weather-app-card> a připojí je k <weather-app>
    this._createWeatherAppCards(forecasts);
  }

  /**
   * Odstraní elementy s názvem města a jednotlivé předpovědi
   */
  private _removeCityNameAndForecasts() {
    while (this._weatherApp.firstChild) {
      this._weatherApp.removeChild(this._weatherApp.firstChild);
    }
  }

  /**
   * Vytvoří elementy <weather-app-card> zobrazující den, teplotu, popis počasí a rychlost větru
   * Každý z vytvořených elementů připojí k <weather-app>
   * @param forecasts pole tříhodinových předpovědí
   */
  private _createWeatherAppCards(forecasts: ThreeHourForecast[]) {
    forecasts.forEach((forecast) => {
      // Vytvoří element <weather-app-card>
      const weatherAppCard = document.createElement("weather-app-card");
      weatherAppCard.setAttribute("slot", "weather-app__card");

      // Vytvoří element zobrazující název dne
      const daySlot = document.createElement("textNode");
      daySlot.setAttribute("slot", "day");
      daySlot.innerHTML = forecast.getDayName();

      // Vytvoří element zobrazující teplotu
      const tempSlot = document.createElement("textNode");
      tempSlot.setAttribute("slot", "temp");
      tempSlot.innerHTML = `${forecast.temp}`;

      // Vytvoří element zobrazující popis počasí
      const descSlot = document.createElement("textNode");
      descSlot.setAttribute("slot", "description");
      descSlot.innerHTML = `${forecast.weatherDescription}`;

      // Vytvoří element zobrazující rychlost větru
      const windSlot = document.createElement("textNode");
      windSlot.setAttribute("slot", "wind");
      windSlot.innerHTML = `${forecast.windSpeed}`;

      // Všechny vytvořené elementy připojí k <weather-app-card>
      weatherAppCard.append(daySlot, tempSlot, descSlot, windSlot);
      this._weatherApp.appendChild(weatherAppCard);
    });
  }

  /**
   * Odchytí událost vyhledání názvu města a nový název pošle do WeatherAppControlleru
   * @param handler - metoda WeatherAppControlleru, která si na základě názvu města vyžádá nová data a překreslí UI
   */
  public bindSearchCity(handler) {
    this._weatherApp.addEventListener("searchSubmit", (event: CustomEvent) => {
      handler(event.detail);
    });
  }
  //#endregion Methods
}
