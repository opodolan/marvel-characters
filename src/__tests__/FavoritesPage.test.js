import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import FavoritesPage from '../pages/FavoritesPage';
import { useCharacters } from '../providers/CharacterProvider';

jest.mock('../providers/CharacterProvider', () => ({
  useCharacters: jest.fn(),
}));

describe('FavoritesPage', () => {
  it('renders the title "Favorites"', () => {
    useCharacters.mockReturnValue({ filteredFavorites: [] });

    render(<FavoritesPage />);

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
