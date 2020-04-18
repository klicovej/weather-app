const template = document.createElement("template");
template.innerHTML = `
    <form id="search-form">
        <input type="text" placeholder="Název hledaného města">
        <button type="submit">Hledat</button>
    </form>
`;
/**
 * Třída reprezentující HTMLElement <weather-app-search>, který slouží pro zobrazení pole a tlačítka pro vyhledání města
 */
export default class WeatherAppSearch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Pokud 'search-form' odchytí událost 'submit', vytvoří vlastní event a ten odešle
        this.shadowRoot.getElementById("search-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const input = this.shadowRoot.querySelector("input");
            const customEvent = new CustomEvent("searchSubmit", { detail: input.value });
            this.dispatchEvent(customEvent);
        });
    }
}
