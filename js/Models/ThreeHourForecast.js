/**
 * Třída reprezentující tříhodinou předpověď
 */
export class ThreeHourForecast {
    //#endregion Propeties
    //#region Constructors
    constructor(temp, date, weatherDescription, windSpeed) {
        this._temp = temp;
        this._date = new Date(date);
        this._weatherDescription = weatherDescription;
        this._windSpeed = windSpeed;
    }
    //#region Fields
    //#region Properies
    get temp() {
        return Math.round(this._temp);
    }
    get date() {
        return this._date;
    }
    get weatherDescription() {
        return this._weatherDescription;
    }
    get windSpeed() {
        return this._windSpeed;
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
