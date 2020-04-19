import { ThreeHourForecast } from "./ThreeHourForecast.js";
import { City } from "./City.js";
import { groupArrByProperty, getMaxValuesFromGroupedArr } from "../Utils/array-utils.js";

/**
 * Třída reprezentující předpověď počasí na 5 dní, po 3 hodinách, pro dané město
 */
export default class FiveDayForecast {
  //#region Fields
  private _cod: string;
  private _treeHourForecasts: Array<ThreeHourForecast> = new Array<ThreeHourForecast>();
  private _city: City;
  //#endregion Fields

  //#region Properties
  get cod() {
    return this._cod;
  }

  get city(): City {
    return this._city;
  }
  //#endregion Properties

  //#region Constructors
  constructor(jsonObject: any) {
    this._cod = jsonObject.cod;

    if (this._cod === "200") {
      for (let threeHourForecast of jsonObject.list) {
        this._treeHourForecasts.push(
          new ThreeHourForecast(
            threeHourForecast.main.temp,
            threeHourForecast.dt_txt,
            threeHourForecast.weather[0].description,
            threeHourForecast.wind.speed
          )
        );
      }

      this._city = new City(
        jsonObject.city.name,
        jsonObject.city.country,
        jsonObject.city.sunrise,
        jsonObject.city.sunset
      );
    }
  }
  //#endregion Constructors

  //#region Methods
  /**
   * Vrátí pole tříhodinových předpovědí s nejvyšší teplotou pro každý den
   */
  public getForecastsWithHighestTempForEveryDay(): Array<ThreeHourForecast> {
    const threeHourForecasts = this._getForecastsWithoutHours(this._treeHourForecasts);
    const threeHourForecastsGroupedByDate = groupArrByProperty(threeHourForecasts, "date");
    const threeHourForecastsWithMaxTemp = getMaxValuesFromGroupedArr(threeHourForecastsGroupedByDate, "temp");

    return threeHourForecastsWithMaxTemp;
  }

  /**
   * Vrátí pole tříhodinových předpovědí jen s datumem bez časového údaje
   * @param {pole objektů typu Forecast} forecastsArr
   */
  private _getForecastsWithoutHours(forecastsArr: Array<ThreeHourForecast>): Array<ThreeHourForecast> {
    return forecastsArr.map((forecast) => {
      forecast.date = new Date(
        `${forecast.date.getFullYear()}-${forecast.date.getMonth() + 1}-${forecast.date.getDate()}`
      );
      return forecast;
    });
  }
  //#endregion Methods
}
