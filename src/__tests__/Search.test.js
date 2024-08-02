import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import { useCharacters } from '../providers/CharacterProvider';

jest.mock('../providers/CharacterProvider', () => ({
  useCharacters: jest.fn(),
}));

describe('Search', () => {
  it('renders search input with initial value from context', () => {
    useCharacters.mockReturnValue({
      searchTerm: 'Spider-Man',
      setSearchTerm: jest.fn(),
    });

    render(<Search found={10} />);

    const inputElement = screen.getByPlaceholderText(/Search a character.../i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Spider-Man');
  });

  it('calls setSearchTerm when input changes', () => {
    const setSearchTermMock = jest.fn();
    useCharacters.mockReturnValue({
      searchTerm: '',
      setSearchTerm: setSearchTermMock,
    });

    render(<Search found={10} />);

    const inputElement = screen.getByPlaceholderText(/Search a character.../i);
    fireEvent.change(inputElement, { target: { value: 'Iron Man' } });

    expect(setSearchTermMock).toHaveBeenCalledTimes(1);
    expect(setSearchTermMock).toHaveBeenCalledWith('Iron Man');
  });

  it('renders the correct number of search results', () => {
    useCharacters.mockReturnValue({
      searchTerm: '',
      setSearchTerm: jest.fn(),
    });

    render(<Search found={5} />);

    const resultsElement = screen.getByText(/5/);
    expect(resultsElement).toBeInTheDocument();
    expect(screen.getByText(/results/i)).toBeInTheDocument();
  });
});
