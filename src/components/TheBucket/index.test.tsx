import React from 'react';

import { fireEvent, render, screen, act } from '@testing-library/react';

import TheBucket from './index';

describe('TheBucket Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should start with 0 glasses and no total', () => {
    render(<TheBucket />);
    expect(screen.getByRole('button')).toHaveTextContent('0 glasses poured');
    expect(screen.queryByText(/Total/)).not.toBeInTheDocument();
  });

  it('should increment glasses count when clicked', () => {
    render(<TheBucket />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveTextContent('2 glasses poured');
  });

  it('should restart countdown after completing a batch', () => {
    render(<TheBucket />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText('00:00:05')).toBeInTheDocument();
    expect(screen.queryByText(/Total/)).not.toBeInTheDocument();
  });

  it('should show accumulated total when countdown finishes', async () => {
    render(<TheBucket />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    fireEvent.click(button);
    fireEvent.click(button);

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Total 2')).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('8 glasses poured');
  });
});
