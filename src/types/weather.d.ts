export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherResponse {
  name: string;
  weather: Weather[];
  main: MainWeather;
  wind: Wind;
  visibility: number;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: MainWeather;
  weather: Weather[];
  wind: Wind;
  visibility: number;
}

export interface ForecastResponse {
  list: ForecastItem[];
}
