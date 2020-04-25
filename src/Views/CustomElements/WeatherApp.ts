import WeatherAppSearch from "./WeatherAppSearch";

const template = document.createElement("template");
template.innerHTML = `
<div>
    <weather-app-search></weather-app-search>
    <h3><slot name="errorMessage"></slot></h3>
    <h1><slot name="city"></slot></h1>
    <div class="weather-app__cards">
      <slot name="weather-app-card"></slot>
    </div>
</div>
`;

/**
 * Třída reprezentující HTMLElement <weather-app>, který zobrazuje vyhledávací pole s tlačítkem a také předpovědi počasí na 5 dní pro dané město
 */
export default class WeatherApp extends HTMLElement {
  //#region Fields
  private _weatherAppSearch: WeatherAppSearch;
  //#endregion Fields

  //#region Constructors
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._weatherAppSearch = this.shadowRoot.querySelector("weather-app-search");
  }
  //#endregion Constructors

  //#region Methods
  connectedCallback() {
    // Pokud <weather-app-search> odchytí událost 'emptyInput' pošle událost, které vyvolá odstranění názvu města a předpovědí a nastaví chybovou hlášku
    this._weatherAppSearch.addEventListener("emptyInput", (event: CustomEvent) => {
      this.dispatchEvent(new CustomEvent("emptyInput", { detail: "Vyplň název města bráško." }));
    });

    // Pokud <weather-app-search> odchytí událost 'searchSubmit', vytvoří vlastní event a ten odešle spolu s názvem města, pro které se má vyhledat předpověď
    this._weatherAppSearch.addEventListener("searchSubmit", (event: CustomEvent) => {
      this.dispatchEvent(new CustomEvent("searchSubmit", { detail: event.detail }));
    });

    // Pokud< weather-app-search> odchytí událost 'getGeolocation', vytvoří vlastní event, který vyvolá zjištění aktuální polohy
    this._weatherAppSearch.addEventListener("getGeolocation", (event: CustomEvent) => {
      this.dispatchEvent(new CustomEvent("getGeolocation"));
    });
  }
  //#endregion Methods
}
