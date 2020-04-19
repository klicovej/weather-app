import WeatherAppCard from "./CustomElements/WeatherAppCard.js";
import WeatherAppSearch from "./CustomElements/WeatherAppSearch.js";
import WeatherApp from "./CustomElements/WeatherApp.js";
/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
    //#endregion Fields
    //#region Constructors
    constructor() {
        window.customElements.define("weather-app", WeatherApp);
        window.customElements.define("weather-app-search", WeatherAppSearch);
        window.customElements.define("weather-app-card", WeatherAppCard);
        this._weatherApp = document.createElement("weather-app");
        document.getElementsByTagName("body")[0].append(this._weatherApp);
        this._weatherApp.addEventListener("emptyInput", (event) => {
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
    renderForecastsForCity(forecasts, city) {
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
    _removeCityNameAndForecasts() {
        while (this._weatherApp.firstChild) {
            this._weatherApp.removeChild(this._weatherApp.firstChild);
        }
    }
    /**
     * Vytvoří elementy <weather-app-card> zobrazující den, teplotu, popis počasí a rychlost větru
     * Každý z vytvořených elementů připojí k <weather-app>
     * @param forecasts pole tříhodinových předpovědí
     */
    _createWeatherAppCards(forecasts) {
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
    _createTextNodeSetSlotAndInnerHTML(slotName, innerHTMLValue) {
        const textNodeElement = document.createElement("textNode");
        textNodeElement.setAttribute("slot", slotName);
        textNodeElement.innerHTML = innerHTMLValue;
        return textNodeElement;
    }
    /**
     * Odchytí událost vyhledání názvu města a nový název pošle do WeatherAppControlleru
     * @param handler - metoda WeatherAppControlleru, která si na základě názvu města vyžádá nová data a překreslí UI
     */
    bindSearchCity(handler) {
        this._weatherApp.addEventListener("searchSubmit", (event) => {
            handler(event.detail);
        });
    }
}
