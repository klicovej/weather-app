/**
 * Třída reprezentující tříhodinou předpověď
 */
export class ThreeHourForecast {
    //#endregion Propeties
    //#region Constructors
    constructor(temp, date) {
        this._temp = temp;
        this._date = new Date(date);
    }
    //#region Fields
    //#region Properies
    get temp() {
        return this._temp;
    }
    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }
    //#endregion Constructors
    //#region Methods
    getDayName() {
        return new Intl.DateTimeFormat("cs-CZ", { weekday: "long" }).format(this.date);
    }
}
