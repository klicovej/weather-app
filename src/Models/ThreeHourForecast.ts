/**
 * Třída reprezentující tříhodinou předpověď
 */
export class ThreeHourForecast {
  //#region Fields
  private _temp: number;
  private _date: Date;
  private _weatherDescription: string;
  private _windSpeed: number;
  //#region Fields

  //#region Properies
  get temp(): number {
    return Math.round(this._temp);
  }

  get date(): Date {
    return this._date;
  }

  get weatherDescription(): string {
    return this._weatherDescription;
  }

  get windSpeed(): number {
    return this._windSpeed;
  }

  set date(date: Date) {
    this._date = date;
  }
  //#endregion Propeties

  //#region Constructors
  constructor(temp: number, date: string, weatherDescription: string, windSpeed: number) {
    this._temp = temp;
    this._date = new Date(date);
    this._weatherDescription = weatherDescription;
    this._windSpeed = windSpeed;
  }
  //#endregion Constructors

  //#region Methods
  public getDayName(): string {
    return new Intl.DateTimeFormat("cs-CZ", { weekday: "long" }).format(this.date);
  }
  //#endregion
}
