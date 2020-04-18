const template = document.createElement("template");

template.innerHTML = `
<style>
    h3 {
        color: coral;
    }  
</style>
<div class="weather-app-card">
    <h2><slot name="day" /></h2>
    <h3><slot name="temp"/></h3>
    <h3><slot name="description"/><</h3>
    <h3><slot name="wind"/><</h3>
</div>
`;

export default class WeatherAppCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
