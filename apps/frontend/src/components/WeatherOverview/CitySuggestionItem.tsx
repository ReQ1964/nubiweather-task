import {
  SUGGESTIONS_MATCH_ERROR,
  SUGGESTIONS_VALIDITY_ERROR,
} from '@/constants/general';

type CityUnion = 'Gliwice' | 'Hamburg' | 'Katowice' | 'Warsaw';

interface CitySuggestionProps {
  suggestion: string;
  handleClick: (suggestion: CityUnion) => void;
}

const CitySuggestionItem = ({
  suggestion,
  handleClick,
}: CitySuggestionProps) => {
  const isError = (suggestion: string) =>
    suggestion === SUGGESTIONS_MATCH_ERROR ||
    suggestion === SUGGESTIONS_VALIDITY_ERROR;

  return (
    <li>
      <button
        type='button'
        onClick={() => handleClick(suggestion as CityUnion)}
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
  );
};

export default CitySuggestionItem;
