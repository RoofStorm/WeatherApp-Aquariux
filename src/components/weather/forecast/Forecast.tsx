import { useState } from 'react';
import { ForecastItem } from '../../../types/weather';
import { groupForecastByDay } from '../../../utils/groupForecastByDay';
import ForecastDay from './ForecastDay';

interface Props {
  forecastList: ForecastItem[];
}

const Forecast = ({ forecastList }: Props) => {
  const grouped = groupForecastByDay(forecastList);
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedEntryId(expandedEntryId === id ? null : id);
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
            expandedEntryId={expandedEntryId}
            onToggleExpand={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
