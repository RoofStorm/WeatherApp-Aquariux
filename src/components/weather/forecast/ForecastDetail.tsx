import { Droplet, Wind, GaugeCircle, Thermometer } from 'lucide-react';
import { ForecastItem } from '../../../types/weather';

interface ForecastDetailProps {
  entry: ForecastItem;
}

const ForecastDetail = ({ entry }: ForecastDetailProps) => {
  return (
    <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-3">
      <div className="mt-2 font-semibold text-gray-600 capitalize">
        {entry.weather[0].description}. The high will be {entry.main.temp_max}
        °C, the low will be {entry.main.temp_min}°C.
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-6">
        <div className="flex items-center gap-2">
          <Thermometer size={16} /> Feels like: {entry.main.feels_like}°C
        </div>
        <div className="flex items-center gap-2">
          <Droplet size={16} /> Humidity: {entry.main.humidity}%
        </div>
        <div className="flex items-center gap-2">
          <Wind size={16} /> Wind: {entry.wind.speed} m/s SSW
        </div>
        <div className="flex items-center gap-2">
          <div
            className="transform transition-transform duration-200"
            style={{ rotate: `${entry.wind.deg}deg` }}
            title={`Direction: ${entry.wind.deg}°`}
          >
            <svg
              className="w-4 h-4 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l6 20-6-4-6 4z" />
            </svg>
          </div>
          <p>Wind direction: {entry.wind.deg} deg</p>
        </div>
        <div className="flex items-center gap-2">
          <GaugeCircle size={16} /> Pressure: {entry.main.pressure} hPa
        </div>
      </div>
    </div>
  );
};

export default ForecastDetail;
