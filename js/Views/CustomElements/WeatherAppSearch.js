const template = document.createElement("template");
template.innerHTML = `
  <form id="search-form">
      <input type="text" placeholder="Název hledaného města">
      <button type="submit">Hledat</button><br>
  </form>
`;
/**
 * Třída reprezentující HTMLElement <weather-app-search>, který slouží pro zobrazení pole a tlačítka pro vyhledání města
 */
export default class WeatherAppSearch extends HTMLElement {
    //#endregion Fields
    //#region Constructors
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._input = this.shadowRoot.querySelector("input");
    }
    //#endregion Constructors
    //#region Methods
    connectedCallback() {
        /**
         * Když 'search-form' odchytí událost 'submit' vytvoří vlastní event a ten odešle.
         * V případě, že do inputu byla zadána hodnota, tak pošle i ji.
         */
        this.shadowRoot.getElementById("search-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValue = this._input.value;
            if (inputValue === "") {
                this.dispatchEvent(new CustomEvent("emptyInput"));
            }
            else {
                this.dispatchEvent(new CustomEvent("searchSubmit", { detail: inputValue }));
            }
        });
    }
}
