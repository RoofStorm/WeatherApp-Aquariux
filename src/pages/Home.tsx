import { useEffect, useState } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherService';
import SearchBar from '../components/search/SearchBar';
import Forecast from '../components/weather/forecast/Forecast';
import useSearchHistory from '../hooks/useSearchHistory';
import { WeatherResponse, ForecastResponse } from '../types/weather';
import SearchHistory from '../components/search/SearchHistory';
import CurrentWeather from '../components/weather/CurrentWeather';

const Home = () => {
  const [city, setCity] = useState<string>('Ho Chi Minh');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [forecastList, setForecastList] = useState<ForecastResponse['list']>(
    []
  );
  const { history, addToHistory, removeFromHistory } = useSearchHistory();
  const [error, setError] = useState<string>('');
  const [input, setInput] = useState('');

  useEffect(() => {
    handleSearch(city);
  }, []);

  const handleSearch = async (searchCity: string) => {
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(searchCity),
        getForecast(searchCity),
      ]);

      setWeatherData(current.data);
      setForecastList(forecast.data.list);
      setCity(searchCity);
      addToHistory(searchCity);
      setError('');
      setInput(''); // reset only on success
    } catch (error) {
      console.log(error);
      setError('Invalid city or country. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 text-gray-800">
      <SearchBar
        onSearch={handleSearch}
        setErrorMessage={setError}
        input={input}
        setInput={setInput}
      />
      {error && <p className="text-red-500 mt-2 font-medium">{error}</p>}

      <SearchHistory
        history={history}
        onSearch={handleSearch}
        onRemove={removeFromHistory}
      />

      {weatherData && <CurrentWeather weatherData={weatherData} />}

      {forecastList.length > 0 && <Forecast forecastList={forecastList} />}
    </div>
  );
};

export default Home;
