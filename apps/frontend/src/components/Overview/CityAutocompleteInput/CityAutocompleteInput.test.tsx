import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CityAutocompleteInput from './CityAutocompleteInput';
import { CurrentCityContext } from '@/App';
import {
  SUGGESTIONS_MATCH_ERROR,
  SUGGESTIONS_VALIDITY_ERROR,
} from '@/constants/general';

describe('CityAutocompleteInput', () => {
  const user = userEvent.setup();
  it('renders correctly with initial state', () => {
    render(
      <CurrentCityContext.Provider
        value={{ currentCity: 'Gliwice', setCurrentCity: vi.fn() }}
      >
        <CityAutocompleteInput />
      </CurrentCityContext.Provider>
    );
    expect(screen.getByLabelText(/choose a city/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('shows suggestions based on input', async () => {
    render(
      <CurrentCityContext.Provider
        value={{ currentCity: 'Gliwice', setCurrentCity: vi.fn() }}
      >
        <CityAutocompleteInput />
      </CurrentCityContext.Provider>
    );

    await user.type(screen.getByRole('textbox'), 'Gli');

    await waitFor(() => {
      expect(screen.getByText('Gliwice')).toBeInTheDocument();
    });
  });

  it('shows error when no matching city', async () => {
    render(
      <CurrentCityContext.Provider
        value={{ currentCity: 'Gliwice', setCurrentCity: vi.fn() }}
      >
        <CityAutocompleteInput />
      </CurrentCityContext.Provider>
    );

    await user.type(screen.getByRole('textbox'), 'UnknownCity');

    await waitFor(() => {
      expect(screen.getByText(SUGGESTIONS_MATCH_ERROR)).toBeInTheDocument();
    });
  });
  it('shows error when trying to submit an unvalid city', async () => {
    render(
      <CurrentCityContext.Provider
        value={{ currentCity: 'Gliwice', setCurrentCity: vi.fn() }}
      >
        <CityAutocompleteInput />
      </CurrentCityContext.Provider>
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'JohnDoeTown');
    user.keyboard('[Enter]');

    await waitFor(() => {
      expect(screen.getByText(SUGGESTIONS_VALIDITY_ERROR)).toBeInTheDocument();
    });
  });

  it('handles "Escape" key event to clear input', async () => {
    render(
      <CurrentCityContext.Provider
        value={{ currentCity: 'Gliwice', setCurrentCity: vi.fn() }}
      >
        <CityAutocompleteInput />
      </CurrentCityContext.Provider>
    );

    await user.type(screen.getByRole('textbox'), 'Gli');
    await waitFor(() => {
      expect(screen.getByText('Gliwice')).toBeInTheDocument();
    });

    await userEvent.keyboard('[Escape]');

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryByText('Gliwice')).not.toBeInTheDocument();
  });

  it('handles "Enter" key event to set current city', async () => {
    const setCurrentCity = vi.fn();

    render(
      <CurrentCityContext.Provider
        value={{ currentCity: 'Gliwice', setCurrentCity }}
      >
        <CityAutocompleteInput />
      </CurrentCityContext.Provider>
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'Hamburg');
    user.keyboard('[Enter]');

    await waitFor(() => {
      expect(setCurrentCity).toHaveBeenCalledWith('Hamburg');
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('handles suggestion click to set current city', async () => {
    const setCurrentCity = vi.fn();
    render(
      <CurrentCityContext.Provider
        value={{ currentCity: 'Gliwice', setCurrentCity }}
      >
        <CityAutocompleteInput />
      </CurrentCityContext.Provider>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Kat' } });

    await waitFor(async () => {
      await user.click(screen.getByText('Katowice'));
    });

    await waitFor(() => {
      expect(setCurrentCity).toHaveBeenCalledWith('Katowice');
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
