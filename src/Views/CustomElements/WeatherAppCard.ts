const template = document.createElement("template");
template.innerHTML = `
<style>
    h3 {
        color: coral;
    }  
</style>
<div class="weather-app__card">
    <h2><slot name="day" /></h2>
    <h3><slot name="temp"/></h3>
    <h3><slot name="description"/><</h3>
    <h3><slot name="wind"/><</h3>
</div>
`;

/**
 * Třída reprezentující HTMLElement <weather-app-card>, který slouží pro zobrazení předpovědi počasí na 1 den
 */
export default class WeatherAppCard extends HTMLElement {
  //#region Constructors
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  //#endregion Constructors
}
