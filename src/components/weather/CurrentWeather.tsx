import { WeatherResponse } from '../../types/weather';

interface CurrentWeatherProps {
  weatherData: WeatherResponse;
}

const CurrentWeather = ({ weatherData }: CurrentWeatherProps) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow-md mx-auto text-center">
      <h2 className="text-2xl font-bold">{weatherData.name}</h2>
      <p className="text-xl text-gray-500 mb-2">
        {new Date()
          .toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          .replace('AM', 'am')
          .replace('PM', 'pm')}
      </p>

      <div className="flex justify-center mb-3">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="weather-icon"
          className="w-20 h-20"
        />
      </div>

      <p className="text-4xl font-semibold">{weatherData.main.temp}°C</p>
      <p className="text-lg capitalize text-gray-600">
        {weatherData.weather[0].description}, Feels like:{' '}
        {weatherData.main.feels_like}°C
      </p>

      <div className="flex justify-between mt-6 text-sm text-gray-600">
        <div className="flex-1">
          <p className="font-medium">Humidity</p>
          <p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
        </div>
        <div className="flex-1">
          <p className="font-medium">Winds</p>
          <div className="flex items-center justify-center gap-1">
            <svg
              className="w-4 h-4 text-blue-400 transform transition-transform duration-200"
              style={{ rotate: `${weatherData.wind.deg}deg` }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l6 20-6-4-6 4z" />
            </svg>
            <p className="text-lg font-semibold">
              {weatherData.wind.speed} m/s
            </p>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-medium">Visibility</p>
          <p className="text-lg font-semibold">
            {weatherData.visibility / 1000} km
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
