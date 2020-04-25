import { ThreeHourForecast } from "../Models/ThreeHourForecast";
import { City } from "../Models/City";
import WeatherAppCard from "./CustomElements/WeatherAppCard";
import WeatherAppSearch from "./CustomElements/WeatherAppSearch";
import WeatherApp from "./CustomElements/WeatherApp";

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
      this.removeCityNameAndForecasts();
      this.createErrorMessage(event.detail);
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
    // Odstraní elementy s názvem města a předpovědi
    this.removeCityNameAndForecasts();

    // Vytvoří element s názvem města a připojí ho k <weather-app>
    const cityTextNode = this._createTextNodeSetSlotAndInnerHTML("city", `${city.name}`);
    this._weatherApp.appendChild(cityTextNode);
    // Vytvoří elementy <weather-app-card> a připojí je k <weather-app>
    this._createWeatherAppCards(forecasts);
  }

  /**
   * Odstraní elementy s názvem města a jednotlivé předpovědi
   */
  public removeCityNameAndForecasts() {
    while (this._weatherApp.firstChild) {
      this._weatherApp.removeChild(this._weatherApp.firstChild);
    }
  }

  /**
   * Nastaví elementu <weather-app> chybovou zprávu
   * @param errorMessage chybová zpráva
   */
  public createErrorMessage(errorMessage: string) {
    const errorMessageSlot = this._createTextNodeSetSlotAndInnerHTML("errorMessage", errorMessage);
    this._weatherApp.appendChild(errorMessageSlot);
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
      weatherAppCard.setAttribute("slot", "weather-app-card");

      // Vytvoří <textnode> zobrazující název dne
      const daySlot = this._createTextNodeSetSlotAndInnerHTML("day", forecast.getDayName());
      // Vytvoří <textnode> zobrazující teplotu
      const tempSlot = this._createTextNodeSetSlotAndInnerHTML("temp", `${forecast.temp}`);
      // Vytvoří <textnode> zobrazující popis počasí
      const descSlot = this._createTextNodeSetSlotAndInnerHTML("description", `${forecast.weatherDescription}`);
      // Vytvoří <textnode> zobrazující rychlost větru
      const windSlot = this._createTextNodeSetSlotAndInnerHTML("wind", `${forecast.windSpeed}`);

      // Všechny vytvořené elementy připojí k <weather-app-card>
      weatherAppCard.append(daySlot, tempSlot, descSlot, windSlot);
      this._weatherApp.appendChild(weatherAppCard);
    });
  }

  /**
   * Vytvoří element <textnode> s danou hodnotou atributu 'slot' a 'innerHTML'
   * @param slotName hodnota atributu 'slot'
   * @param innerHTMLValue hodnota 'innerHTML'
   */
  private _createTextNodeSetSlotAndInnerHTML(slotName: string, innerHTMLValue: string) {
    const textNodeElement = document.createElement("textNode");
    textNodeElement.setAttribute("slot", slotName);
    textNodeElement.innerHTML = innerHTMLValue;
    return textNodeElement;
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

  /**
   * Odchytí událost pro zjištění aktuální polohy a následně překreslí UI
   * @param handler metoda WeatherAppControlleru, která vyvolá zjištění aktuální polohy a následně překreslení UI
   */
  public bindGetGeolocation(handler) {
    this._weatherApp.addEventListener("getGeolocation", (event) => {
      handler();
    });
  }
  //#endregion Methods
}
