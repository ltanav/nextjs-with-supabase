// __tests__/CounterList.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CounterList from '../components/CounterList';

describe('CounterList component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<CounterList />);
    expect(getByText('Add Counter')).toBeInTheDocument();
  });

  it('adds a counter when the button is clicked', () => {
    const { getByText } = render(<CounterList />);
    fireEvent.click(getByText('Add Counter'));
    expect(getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments the counter when the increment button is clicked', () => {
    const { getByText } = render(<CounterList />);
    fireEvent.click(getByText('Add Counter'));
    const incrementButton = getByText('Increment');
    fireEvent.click(incrementButton);
    expect(getByText('Count: 1')).toBeInTheDocument();
  });

  it('adds multiple counters and increments them independently', () => {
    const { getByText, getAllByText } = render(<CounterList />);
    fireEvent.click(getByText('Add Counter')); // Add first counter
    fireEvent.click(getByText('Add Counter')); // Add second counter

    const incrementButtons = getAllByText('Increment');

    fireEvent.click(incrementButtons[0]); // Increment first counter
    expect(getByText('Count: 1')).toBeInTheDocument();
    expect(getByText('Count: 0')).toBeInTheDocument(); // Second counter should still be 0

    fireEvent.click(incrementButtons[1]); // Increment second counter
    expect(getByText('Count: 1')).toBeInTheDocument(); // First counter remains 1
    expect(getByText('Count: 1')).toBeInTheDocument(); // Second counter should now be 1
  });
});