const template = document.createElement("template");
template.innerHTML = `
<div>
    <weather-app-search></weather-app-search>
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
        // Pokud 'weather-app-search' odchytí událost 'emptyInput' pošle událost, které vyvolá odstranění názvu města a předpovědí
        this._weatherAppSearch.addEventListener("emptyInput", (event) => {
            this.dispatchEvent(new CustomEvent("emptyInput"));
        });
        // Pokud 'weather-app-search' odchytí událost 'searchSubmit', vytvoří vlastní event a ten odešle spolu s názvem města, pro které se má vyhledat předpověď
        this._weatherAppSearch.addEventListener("searchSubmit", (event) => {
            this.dispatchEvent(new CustomEvent("searchSubmit", { detail: event.detail }));
        });
    }
}