import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import useSearchHistory from '../../hooks/useSearchHistory';

type Props = {
  onSearch: (city: string) => void;
  setErrorMessage: (error: string) => void;
  input: string;
  setInput: (value: string) => void;
};

const SearchBar = ({ onSearch, setErrorMessage, input, setInput }: Props) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const { history } = useSearchHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim()); // no reset here
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput('');
    onSearch(suggestion);
  };

  useEffect(() => {
    setErrorMessage('');
  }, [input, setErrorMessage]);

  useEffect(() => {
    if (input.trim()) {
      setFilteredSuggestions(
        history.filter((city) =>
          city.toLowerCase().startsWith(input.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [input, history]);

  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow-md w-full max-w-screen-xl">
      <form onSubmit={handleSubmit} className="flex gap-2 bg-white relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 shadow-sm"
          placeholder="Search city..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 cursor-pointer flex items-center gap-2"
        >
          <Search size={18} />
          Search
        </button>
        {filteredSuggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
