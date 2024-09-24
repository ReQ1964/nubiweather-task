import {
  SUGGESTIONS_MATCH_ERROR,
  SUGGESTIONS_VALIDITY_ERROR,
} from '@/constants/general';

type CityUnion = 'Gliwice' | 'Hamburg' | 'Katowice' | 'Warsaw';

interface CityAutocompleteSuggestionProps {
  suggestion: string;
  handleClick: (suggestion: CityUnion) => void;
}

const isError = (suggestion: string) =>
  suggestion === SUGGESTIONS_MATCH_ERROR ||
  suggestion === SUGGESTIONS_VALIDITY_ERROR;

const CityAutocompleteSuggestion = ({
  suggestion,
  handleClick,
}: CityAutocompleteSuggestionProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={() => handleClick(suggestion as CityUnion)}
        disabled={isError(suggestion)}
        className={`w-full p-3 text-left duration-75 hover:border-l-4 hover:border-sky-900 hover:bg-sky-100 focus:border-l-4 focus:border-sky-900 focus:bg-sky-100 ${
          isError(suggestion) ? 'cursor-not-allowed text-red-800' : ''
        }`}
      >
        {suggestion}
      </button>
    </li>
  );
};

export default CityAutocompleteSuggestion;
