import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SwiperWrapper from './SwiperWrapper';

describe('SwiperWrapper', () => {
  it('should render children', () => {
    render(
      <SwiperWrapper>
        <div>I am a child</div>
      </SwiperWrapper>
    );

    expect(screen.getByText(/i am a child/i)).toBeInTheDocument();
  });
});
