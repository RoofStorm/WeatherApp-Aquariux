import { useState } from 'react';
import { ForecastItem } from '../../../types/weather';
import { groupForecastByDay } from '../../../utils/groupForecastByDay';
import ForecastDay from './ForecastDay';

interface Props {
  forecastList: ForecastItem[];
}

const Forecast = ({ forecastList }: Props) => {
  const grouped = groupForecastByDay(forecastList);
  const [expandedDay, setExpandedDay] = useState<string | null>(null); // Track expanded day by date string

  const toggleDay = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">5-day Forecast (3 Hours)</h2>
      <div className="bg-gray-100 rounded-xl p-4 shadow-md">
        {Object.entries(grouped).map(([date, entries]) => (
          <ForecastDay
            key={date}
            date={date}
            entries={entries}
            isExpanded={expandedDay === date}
            onToggleDay={() => toggleDay(date)}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
