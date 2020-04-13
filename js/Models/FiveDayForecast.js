import { ThreeHourForecast } from "./ThreeHourForecast.js";
import { City } from "./City.js";
import { groupArrByProperty, getMaxValuesFromGroupedArr } from "../Utils/array-utils.js";
/**
 * Třída reprezentující předpověď počasí na 5 dní, po 3 hodinách, pro dané město
 */
export default class FiveDayForecast {
    //#endregion Properties
    //#region Constructors
    constructor(jsonObject) {
        //#region Fields
        this._treeHourForecasts = new Array();
        for (let threeHourForecast of jsonObject.list) {
            this._treeHourForecasts.push(new ThreeHourForecast(threeHourForecast.main.temp, threeHourForecast.dt_txt));
        }
        this._city = new City(jsonObject.city.name, jsonObject.city.country, jsonObject.city.sunrise, jsonObject.city.sunset);
    }
    //#endregion Fields
    //#region Properties
    get city() {
        return this._city;
    }
    //#endregion Constructors
    //#region Methods
    /**
     * Vrátí pole tříhodinových předpovědí s nejvyšší teplotou pro každý den
     */
    getForecastsWithHighestTempForEveryDay() {
        const threeHourForecasts = this._getForecastsWithoutHours(this._treeHourForecasts);
        const threeHourForecastsGroupedByDate = groupArrByProperty(threeHourForecasts, "date");
        const threeHourForecastsWithMaxTemp = getMaxValuesFromGroupedArr(threeHourForecastsGroupedByDate, "temp");
        return threeHourForecastsWithMaxTemp;
    }
    /**
     * Vrátí pole tříhodinových předpovědí jen s datumem bez časového údaje
     * @param {pole objektů typu Forecast} forecastsArr
     */
    _getForecastsWithoutHours(forecastsArr) {
        return forecastsArr.map((forecast) => {
            forecast.date = new Date(`${forecast.date.getFullYear()}-${forecast.date.getMonth() + 1}-${forecast.date.getDate()}`);
            return forecast;
        });
    }
}
