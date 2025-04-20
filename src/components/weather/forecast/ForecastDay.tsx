import { format, parseISO, isToday } from 'date-fns';
import { useState } from 'react';
import ForecastItemRow from './ForecastItemRow';
import { ForecastItem } from '../../../types/weather';
import { Clock, ThermometerSun, Cloud, ChevronDown } from 'lucide-react';

interface ForecastDayProps {
  date: string;
  entries: ForecastItem[];
  isExpanded: boolean;
  onToggleDay: () => void;
}

const ForecastDay = ({
  date,
  entries,
  isExpanded,
  onToggleDay,
}: ForecastDayProps) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const startTime = format(parseISO(entries[0].dt_txt), 'HH:mm');
  const endTime = format(parseISO(entries[entries.length - 1].dt_txt), 'HH:mm');
  const minTemp = Math.min(...entries.map((e) => e.main.temp_min));
  const maxTemp = Math.max(...entries.map((e) => e.main.temp_max));
  const mainDescription = entries[0].weather[0].main;

  return (
    <div className="mb-6">
      <div
        className={`flex justify-between items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 border 
          ${isExpanded ? 'bg-gray-300 border-gray-400' : 'bg-white hover:bg-gray-300 border-gray-200'}`}
        onClick={onToggleDay}
      >
        {/* Left: Date */}
        <div className="text-base font-medium text-gray-800">
          {isToday(parseISO(date)) ? 'Today' : format(parseISO(date), 'd MMMM')}
        </div>

        {/* Center: Time & Temp */}
        <div className="text-sm text-gray-600 text-center">
          <div className="flex justify-center items-center gap-1">
            <Clock className="w-4 h-4" />
            {startTime} - {endTime}
          </div>
          <div className="flex justify-center items-center gap-1">
            <ThermometerSun className="w-4 h-4" />
            {maxTemp.toFixed(1)}° / {minTemp.toFixed(1)}°C
          </div>
        </div>

        {/* Right: Description + Chevron */}
        <div className="flex items-center justify-end gap-2 text-sm text-gray-500 capitalize">
          <Cloud className="w-4 h-4" />
          {mainDescription}
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      {isExpanded && (
        <ul className="space-y-3 mt-4">
          {entries.map((entry) => (
            <ForecastItemRow
              key={entry.dt}
              entry={entry}
              isExpanded={expandedRowId === entry.dt}
              onClick={() => toggleRow(entry.dt)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ForecastDay;
