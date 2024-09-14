import { useState, useContext } from 'react';
import { CurrentCityContext } from '@/App';

type CityUnion = 'Gliwice' | 'Hamburg' | 'Katowice' | 'Warsaw';

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
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ['No matches found']
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!possibleValues.find((value) => value === inputValue)) {
        setSuggestions(['Select a valid city']);
        return;
      }
      setCurrentCity(inputValue);
      setInputValue('');
    }
  };

  const handleSuggestionClick = (suggestion: CityUnion) => {
    setCurrentCity(suggestion);
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div className='relative'>
      <label htmlFor='city'>Choose city</label>
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
            <li
              className={
                suggestion === 'No matches found' ||
                suggestion === 'Select a valid city'
                  ? 'text-red-800'
                  : ''
              }
              key={suggestion}
            >
              <button
                type='button'
                onClick={() => handleSuggestionClick(suggestion as CityUnion)}
                className='w-full p-3 text-left duration-75 hover:scale-105'
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
