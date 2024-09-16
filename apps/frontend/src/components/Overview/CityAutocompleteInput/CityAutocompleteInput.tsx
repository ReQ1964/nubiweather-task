import { useState, useContext, useEffect } from 'react';
import { CurrentCityContext } from '@/App';
import CityAutocompleteSuggestion from './CityAutocompleteSuggestion/CityAutocompleteSuggestion';
import {
  SUGGESTIONS_MATCH_ERROR,
  SUGGESTIONS_VALIDITY_ERROR,
} from '@/constants/general';

type CityUnion = 'Gliwice' | 'Hamburg' | 'Katowice' | 'Warsaw';

const cities: CityUnion[] = ['Gliwice', 'Hamburg', 'Katowice', 'Warsaw'];

const filterSuggestions = (input: string, cities: CityUnion[]) => {
  return cities.filter((city) =>
    city.toLowerCase().includes(input.toLowerCase())
  );
};

const CityAutocompleteInput = () => {
  const { setCurrentCity } = useContext(CurrentCityContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<
    (
      | CityUnion
      | typeof SUGGESTIONS_MATCH_ERROR
      | typeof SUGGESTIONS_VALIDITY_ERROR
    )[]
  >([]);

  const clearInput = () => {
    setInputValue('');
    setSuggestions([]);
  };

  useEffect(() => {
    const clearInputOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInput();
      }
    };

    window.addEventListener('keydown', clearInputOnEscape);
    return () => window.removeEventListener('keydown', clearInputOnEscape);
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filteredSuggestions = filterSuggestions(inputValue, cities);

      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : [SUGGESTIONS_MATCH_ERROR]
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const validCity = cities.find(
      (value) => value === (inputValue as CityUnion)
    );
    if (!validCity) {
      setSuggestions([SUGGESTIONS_VALIDITY_ERROR]);
      return;
    }

    setCurrentCity(validCity);
    clearInput();
  };

  const handleSuggestionClick = (suggestion: CityUnion) => {
    setCurrentCity(suggestion as CityUnion);
    clearInput();
  };

  return (
    <div className='relative'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='city'>Choose a city</label>
        <input
          type='text'
          id='city'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          aria-autocomplete='list'
          aria-controls='autocomplete-list'
          className='max-w-xs border-2 border-black'
        />
      </div>
      {suggestions.length > 0 && (
        <ul className='absolute mt-2 w-full max-w-xs rounded-b-lg bg-white shadow-lg'>
          {suggestions.slice(0, 4).map((suggestion) => (
            <CityAutocompleteSuggestion
              key={suggestion}
              suggestion={suggestion}
              handleClick={handleSuggestionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocompleteInput;
