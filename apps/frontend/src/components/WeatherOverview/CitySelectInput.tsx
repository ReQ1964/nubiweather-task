import { useState, useContext, useEffect, useMemo } from 'react';
import { CurrentCityContext } from '@/App';
import CitySuggestionItem from './CitySuggestionItem';
import {
  SUGGESTIONS_MATCH_ERROR,
  SUGGESTIONS_VALIDITY_ERROR,
} from '@/constants/general';

type CityUnion = 'Gliwice' | 'Hamburg' | 'Katowice' | 'Warsaw';

const CitySelectInput = () => {
  const { setCurrentCity } = useContext(CurrentCityContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const possibleValues: CityUnion[] = useMemo(
    () => ['Gliwice', 'Hamburg', 'Katowice', 'Warsaw'],
    []
  );

  useEffect(() => {
    const clearInputOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInputValue('');
        setSuggestions([]);
      }
    };

    window.addEventListener('keydown', clearInputOnEscape);
    return () => window.removeEventListener('keydown', clearInputOnEscape);
  }, []);

  useEffect(() => {
    if (inputValue.length === 0) {
      setSuggestions([]);
      return;
    }

    const delayInputTimeoutId = setTimeout(() => {
      if (inputValue.length > 0) {
        const filteredSuggestions = possibleValues.filter((suggestion) =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
        );

        setSuggestions(
          filteredSuggestions.length > 0
            ? filteredSuggestions
            : [SUGGESTIONS_MATCH_ERROR]
        );
      }
    }, 300);
    return () => clearTimeout(delayInputTimeoutId);
  }, [possibleValues, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!possibleValues.find((value) => value === inputValue)) {
        setSuggestions([SUGGESTIONS_VALIDITY_ERROR]);
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
            <CitySuggestionItem
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

export default CitySelectInput;
