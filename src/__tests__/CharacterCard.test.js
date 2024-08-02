import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard';
import { useCharacters } from '../providers/CharacterProvider';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../providers/CharacterProvider', () => ({
  useCharacters: jest.fn(),
}));

describe('CharacterCard', () => {
  const character = {
    id: 1,
    name: 'Test Character',
    thumbnail: { path: 'path/to/image', extension: 'jpg' },
  };
  
  const addFavoriteMock = jest.fn();
  const removeFavoriteMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details correctly', () => {
    useCharacters.mockReturnValue({ favorites: [], addFavorite: addFavoriteMock, removeFavorite: removeFavoriteMock });

    render(
      <Router>
        <CharacterCard character={character} />
      </Router>
    );

    expect(screen.getByText('Test Character')).toBeInTheDocument();
    expect(screen.getByAltText('Test Character')).toHaveAttribute('src', 'path/to/image.jpg');
  });

  it('navigates to character detail page on image click', () => {
    useCharacters.mockReturnValue({ favorites: [], addFavorite: addFavoriteMock, removeFavorite: removeFavoriteMock });

    render(
      <Router>
        <CharacterCard character={character} />
      </Router>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/characters/1');
  });
});
