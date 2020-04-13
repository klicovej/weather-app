/**
 * Třída reprezentující město
 */
export class City {
  //#region Fields
  private _name: string;
  private _country: string;
  private _sunrise: number;
  private _sunset: number;
  //#endregion Fields

  //#region Properties
  get name(): string {
    return this._name;
  }

  get country(): string {
    return this._country;
  }

  get sunrise(): number {
    return this._sunrise;
  }

  get sunset(): number {
    return this._sunset;
  }
  //#endregion Properties

  //#region Constructors
  constructor(name: string, country: string, sunrise: number, sunset: number) {
    this._name = name;
    this._country = country;
    this._sunrise = sunrise;
    this._sunset = sunset;
  }
  //#endregion Constructors
}
