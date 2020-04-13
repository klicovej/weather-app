/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
    //#endregion Fields
    //#region Constructors
    constructor(dataToView, city) {
        this._dataToView = dataToView;
        this._city = city;
    }
    //#endregion Constructors
    //#region Methods
    /**
     * Vykreslí předaná data
     */
    render() {
        const cityNameInput = document.createElement("input");
        cityNameInput.placeholder = "Your city name";
        cityNameInput.type = "text";
        cityNameInput.name = "cityName";
        const searchButton = document.createElement("button");
        searchButton.type = "Button";
        searchButton.textContent = "Search";
        const divElement = document.createElement("div");
        const h1Node = document.createElement("h1");
        const h1TextNode = document.createTextNode(this._city.name);
        document.getElementsByTagName("body")[0].appendChild(divElement);
        divElement.appendChild(cityNameInput);
        divElement.appendChild(searchButton);
        h1Node.appendChild(h1TextNode);
        divElement.appendChild(h1Node);
        const ulNode = document.createElement("ul");
        this._dataToView.forEach((forecast) => {
            const liNode = document.createElement("li");
            const textNode = document.createTextNode(`Den: ${forecast.getDayName()} je nejvyšší teplota dne ${forecast.temp}`);
            liNode.appendChild(textNode);
            ulNode.appendChild(liNode);
        });
        divElement.appendChild(ulNode);
    }
}
