const template = document.createElement("template");
template.innerHTML = `
<div>
    <h1><slot name="city" /></h1>
    <weather-app-search></weather-app-search>
    <slot name="weather-app-cards"></slot>
</div>
`;
/**
 * Třída reprezentující HTMLElement <weather-app>, který slouží pro zobrazení předpovědi počasí na 5 dní pro dané město
 */
export default class WeatherApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Pokud 'weather-app-search' odchytí událost 'searchSubmit', vytvoří vlastní event a ten odešle
        this.shadowRoot.querySelector("weather-app-search").addEventListener("searchSubmit", (event) => {
            event.preventDefault();
            const input = event.detail;
            const customEvent = new CustomEvent("appSubmit", { detail: input });
            this.dispatchEvent(customEvent);
        });
    }
}
