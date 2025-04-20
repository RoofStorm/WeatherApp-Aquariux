import { Search, Trash2 } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSearch: (city: string) => void;
  onRemove: (city: string) => void;
}

const SearchHistory = ({ history, onSearch, onRemove }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Search History</h3>
      <div className="bg-gray-100 rounded-xl p-4 shadow-md w-full max-w-screen-xl">
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {history.map((item) => (
            <li
              key={item}
              className="flex justify-between items-center bg-white px-3 py-2 rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <span className="text-gray-800">{item}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSearch(item)}
                  className="text-gray-600 hover:text-blue-600"
                  title="Search"
                >
                  <Search size={16} />
                </button>
                <button
                  onClick={() => onRemove(item)}
                  className="text-gray-600 hover:text-red-500"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchHistory;
