import WeatherAppController from "./Controller/WeatherAppControler.js";
import WeatherAppModel from "./Models/WeatherAppModel.js";
import WeatherAppView from "./View/WeatherAppView.js";

const cityName = "Praha";
const RESOURCE_URL: string = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4a710277b41d7da791e44bf515bac6f7&units=metric`;

/**
 * Vytvoří aplikaci zobrazující předpověď počasí na následujích 5 dní z dat, která získá na zadané URL adrese
 * - znicializuje Model, Controller a View
 */
async function createWeatherApp(url: string) {
  const model = new WeatherAppModel(url);
  await model.initialize();

  const controller = new WeatherAppController(model, new WeatherAppView());
}

createWeatherApp(RESOURCE_URL);
