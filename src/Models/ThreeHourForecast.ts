/**
 * Třída reprezentující tříhodinou předpověď
 */
export class ThreeHourForecast {
  //#region Fields
  private _temp: number;
  private _date: Date;
  //#region Fields

  //#region Properies
  get temp(): number {
    return this._temp;
  }

  get date(): Date {
    return this._date;
  }

  set date(date: Date) {
    this._date = date;
  }
  //#endregion Propeties

  //#region Constructors
  constructor(temp: number, date: string) {
    this._temp = temp;
    this._date = new Date(date);
  }
  //#endregion Constructors
}
