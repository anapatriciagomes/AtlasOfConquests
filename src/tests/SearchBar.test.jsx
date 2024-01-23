import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('should render input element', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText('Country Name');
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type in input', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText('Country Name');
    fireEvent.change(inputElement, { target: { value: 'Portugal' } });
    expect(inputElement.value).toBe('Portugal');
  });
});
