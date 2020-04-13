/**
 * Třída reprezentující město
 */
export class City {
    //#endregion Properties
    //#region Constructors
    constructor(name, country, sunrise, sunset) {
        this._name = name;
        this._country = country;
        this._sunrise = sunrise;
        this._sunset = sunset;
    }
    //#endregion Fields
    //#region Properties
    get name() {
        return this._name;
    }
    get country() {
        return this._country;
    }
    get sunrise() {
        return this._sunrise;
    }
    get sunset() {
        return this._sunset;
    }
}
