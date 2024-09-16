import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import CityAutocompleteSuggestion from './CityAutocompleteSuggestion';
import { describe, expect, it, vi } from 'vitest';
import {
  SUGGESTIONS_MATCH_ERROR,
  SUGGESTIONS_VALIDITY_ERROR,
} from '@/constants/general';

describe('CityAutocompleteSuggestion', () => {
  const user = userEvent.setup();

  it('renders a suggestion and handles button click', async () => {
    const mockedFunction = vi.fn();

    render(
      <CityAutocompleteSuggestion
        suggestion='Vienn'
        handleClick={mockedFunction}
      />
    );

    const suggestionText = screen.getByText(/vienn/i);
    const button = screen.getByRole('button');

    expect(suggestionText).toBeInTheDocument();

    await user.click(button);
    expect(mockedFunction).toHaveBeenCalledOnce();
  });

  it('displays match error and disables the button', async () => {
    const mockedFunction = vi.fn();

    render(
      <CityAutocompleteSuggestion
        suggestion={SUGGESTIONS_MATCH_ERROR}
        handleClick={mockedFunction}
      />
    );

    const errorText = screen.getByText(SUGGESTIONS_MATCH_ERROR);
    const button = screen.getByRole('button');

    expect(errorText).toBeInTheDocument();
    expect(button).toBeDisabled();

    await user.click(button);
    expect(mockedFunction).not.toHaveBeenCalled();
  });

  it('displays validity error and disables the button', async () => {
    const mockedFunction = vi.fn();

    render(
      <CityAutocompleteSuggestion
        suggestion={SUGGESTIONS_VALIDITY_ERROR}
        handleClick={mockedFunction}
      />
    );

    const errorText = screen.getByText(SUGGESTIONS_VALIDITY_ERROR);
    const button = screen.getByRole('button');

    expect(errorText).toBeInTheDocument();
    expect(button).toBeDisabled();

    await user.click(button);
    expect(mockedFunction).not.toHaveBeenCalled();
  });
});
