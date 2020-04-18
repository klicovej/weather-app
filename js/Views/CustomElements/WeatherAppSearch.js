const template = document.createElement("template");
template.innerHTML = `
    <form id="search-form">
        <input type="text" placeholder="Název hledaného města">
        <button type="submit">Hledat</button>
    </form>
`;
export default class WeatherAppSearch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById("search-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const input = this.shadowRoot.querySelector("input");
            const evt = new CustomEvent("build", { detail: input.value });
            this.dispatchEvent(evt);
        });
    }
}
