/**
 * Třída se stará o UI aplikace
 */
export default class WeatherAppView {
  //#region Fields
  private _dataToView;
  //#endregion Fields

  //#region Constructors
  constructor(dataToView: any[]) {
    this._dataToView = dataToView;
  }
  //#endregion Constructors
}
