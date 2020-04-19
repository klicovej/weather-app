const template = document.createElement("template");
template.innerHTML = `
  <form id="search-form">
      <input type="text" placeholder="Název hledaného města">
      <button type="submit">Hledat</button><br>
      <label></label> 
  </form>
`;
/**
 * Třída reprezentující HTMLElement <weather-app-search>, který slouží pro zobrazení pole a tlačítka pro vyhledání města, zobrazuje i label při chybě
 */
export default class WeatherAppSearch extends HTMLElement {
    //#endregion Fields
    //#region Constructors
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._label = this.shadowRoot.querySelector("label");
        this._input = this.shadowRoot.querySelector("input");
    }
    //#endregion Constructors
    //#region Methods
    connectedCallback() {
        // Pokud 'search-form' odchytí událost 'submit' vytvoří vlastní event a ten odešle
        // - pokud nebyl do inputu zadán žádný text, tak navíc zobrazí label s chybovou zprávou
        this.shadowRoot.getElementById("search-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValue = this._input.value;
            if (inputValue === "") {
                this._label.textContent = "Vyplň město, který chceš vyhledat bráško";
                this.dispatchEvent(new CustomEvent("emptyInput"));
            }
            else {
                this._label.textContent = "";
                this.dispatchEvent(new CustomEvent("searchSubmit", { detail: inputValue }));
            }
        });
    }
}
