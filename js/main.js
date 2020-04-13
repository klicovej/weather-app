import WeatherAppController from "./Controller/WeatherAppControler.js";
import WeatherAppModel from "./Models/WeatherAppModel.js";
const cityName = "Praha";
const RESOURCE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4a710277b41d7da791e44bf515bac6f7&units=metric`;
/**
 * Vytvoří aplikaci zobrazující předpověď počasí na následujích 5 dní z dat, která získá na zadané URL adrese
 * - znicializuje Model, Controller a View
 */
async function createWeatherApp(url) {
    const model = new WeatherAppModel(url);
    await model.initialize();
    const controller = new WeatherAppController(model);
    controller.view.render();
}
createWeatherApp(RESOURCE_URL);
