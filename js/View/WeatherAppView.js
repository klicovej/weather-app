/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
    //#endregion Fields
    //#region Constructors
    constructor(dataToView) {
        this._dataToView = dataToView;
    }
    //#endregion Constructors
    //#region Methods
    render() {
        const listDiv = document.getElementById("list");
        const ulNode = document.createElement("ul");
        this._dataToView.forEach((forecast) => {
            const liNode = document.createElement("li");
            const textNode = document.createTextNode(`Datum: ${forecast.date} Nejvyšší teplota dne ${forecast.temp}`);
            liNode.appendChild(textNode);
            ulNode.appendChild(liNode);
        });
        listDiv.appendChild(ulNode);
    }
}
