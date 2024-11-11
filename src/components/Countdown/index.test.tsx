import React from 'react';

import { render, screen } from '@testing-library/react';

import Countdown from './index';

describe('Countdown Component', () => {
  test('should render Countdown component', () => {
    render(<Countdown seconds={300} />);

    expect(screen.getByText('Reserving your wines for')).toBeInTheDocument();
    expect(screen.getByText('00:05:00')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    const customLabel = 'Time remaining:';
    render(<Countdown seconds={300} label={customLabel} />);

    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  it('formats time units correctly for different durations', () => {
    render(<Countdown seconds={7322} />);
    expect(screen.getByText('02:02:02')).toBeInTheDocument();

    const { rerender } = render(<Countdown seconds={3661} />);
    expect(screen.getByText('01:01:01')).toBeInTheDocument();

    rerender(<Countdown seconds={59} />);
    expect(screen.getByText('00:00:59')).toBeInTheDocument();
  });
});
