import { useState, useContext } from 'react';
import { CurrentCityContext } from '@/App';

const MATCHES_ERROR = 'No matches found';
const VALIDITY_ERROR = 'Select a valid city';

type CityUnion = 'Gliwice' | 'Hamburg' | 'Katowice' | 'Warsaw';

const isError = (suggestion: string) =>
  suggestion === MATCHES_ERROR || suggestion === VALIDITY_ERROR;

const CitySelectInput = () => {
  const { setCurrentCity } = useContext(CurrentCityContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const possibleValues: CityUnion[] = [
    'Gliwice',
    'Hamburg',
    'Katowice',
    'Warsaw',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = possibleValues.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(
        filteredSuggestions.length > 0 ? filteredSuggestions : [MATCHES_ERROR]
      );
    } else setSuggestions([]);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!possibleValues.find((value) => value === inputValue)) {
        setSuggestions([VALIDITY_ERROR]);
        return;
      }
      setCurrentCity(inputValue);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: CityUnion) => {
    setCurrentCity(suggestion);
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div className='relative'>
      <label htmlFor='city'>Choose a city</label>
      <input
        type='text'
        id='city'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputSubmit}
        aria-autocomplete='list'
        aria-controls='autocomplete-list'
        className='border-2 border-black'
      />
      {suggestions.length > 0 && (
        <ul className='absolute mt-2 w-full rounded-b-lg bg-white shadow-lg'>
          {suggestions.slice(0, 4).map((suggestion) => (
            <li key={suggestion}>
              <button
                type='button'
                onClick={() => handleSuggestionClick(suggestion as CityUnion)}
                disabled={isError(suggestion)}
                className={`w-full p-3 text-left duration-75  ${
                  isError(suggestion)
                    ? 'cursor-not-allowed text-red-800'
                    : 'hover:scale-105'
                }`}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelectInput;
