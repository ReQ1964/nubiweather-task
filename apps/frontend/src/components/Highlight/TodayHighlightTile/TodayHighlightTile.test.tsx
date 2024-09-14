import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TodayHighlightTile } from './TodayHighlightTile';

describe('TodayHighlightTile', () => {
  it('should render with given props', () => {
    const props = {
      heading: 'Sun',
      text: 'Cloudy',
      icon: <div>Icon</div>,
    };
    render(
      <TodayHighlightTile
        heading={props.heading}
        text={props.text}
        icon={props.icon}
      />
    );
    expect(screen.getByText(props.heading)).toBeInTheDocument();
    expect(screen.getByText(props.text)).toBeInTheDocument();
    expect(screen.getByText(/icon/i)).toBeInTheDocument();
  });
});
