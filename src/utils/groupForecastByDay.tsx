import { format, parseISO } from 'date-fns';
import { ForecastItem } from '../types/weather';

export function groupForecastByDay(
  list: ForecastItem[]
): Record<string, ForecastItem[]> {
  const grouped: Record<string, ForecastItem[]> = {};

  list.forEach((item) => {
    const date = format(parseISO(item.dt_txt), 'yyyy-MM-dd');
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  return grouped;
}
