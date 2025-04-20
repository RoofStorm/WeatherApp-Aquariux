import { format, parseISO } from 'date-fns';
import ForecastDetail from './ForecastDetail';
import { ForecastItem } from '../../../types/weather';

interface ForecastItemRowProps {
  entry: ForecastItem;
  isExpanded: boolean;
  onClick: () => void;
}

const ForecastItemRow = ({
  entry,
  isExpanded,
  onClick,
}: ForecastItemRowProps) => {
  return (
    <li
      className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium w-[50px]">
          {format(parseISO(entry.dt_txt), 'HH:mm')}
        </span>

        <div className="flex items-center gap-3">
          <img
            src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
            alt={entry.weather[0].description}
            className="w-8 h-8"
          />
          <span className="text-sm">
            {entry.main.temp_max.toFixed(2)}° / {entry.main.temp_min.toFixed(2)}
            °C
          </span>
        </div>

        <span className="text-sm capitalize text-gray-600 w-[120px] text-right">
          {entry.weather[0].description}
        </span>
      </div>

      {isExpanded && <ForecastDetail entry={entry} />}
    </li>
  );
};

export default ForecastItemRow;
