import { format, parseISO, isToday } from 'date-fns';
import ForecastItemRow from './ForecastItemRow';
import { ForecastItem } from '../../../types/weather';

interface ForecastDayProps {
  date: string;
  entries: ForecastItem[];
  expandedEntryId: number | null;
  onToggleExpand: (id: number) => void;
}

const ForecastDay = ({
  date,
  entries,
  expandedEntryId,
  onToggleExpand,
}: ForecastDayProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">
        {isToday(parseISO(date)) ? 'Today' : format(parseISO(date), 'd MMMM')}
      </h3>
      <ul className="space-y-3">
        {entries.map((entry) => (
          <ForecastItemRow
            key={entry.dt}
            entry={entry}
            isExpanded={expandedEntryId === entry.dt}
            onClick={() => onToggleExpand(entry.dt)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ForecastDay;
