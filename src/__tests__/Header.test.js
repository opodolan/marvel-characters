import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { useCharacters } from '../providers/CharacterProvider';

jest.mock('../providers/CharacterProvider', () => ({
  useCharacters: jest.fn(),
}));

describe('Header', () => {
  it('renders the Marvel logo', () => {
    useCharacters.mockReturnValue({ favorites: [] });

    render(<Header />);

    const logo = screen.getByAltText(/Marvel Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('marvel_logo.png'));
  });

  it('renders the favorites icon with the correct count', () => {
    const mockFavorites = [
      { id: 1, name: 'Iron Man' },
      { id: 2, name: 'Captain America' },
    ];

    useCharacters.mockReturnValue({ favorites: mockFavorites });

    render(<Header />);

    const favoritesIcon = screen.getByAltText(/Favorites/i);
    expect(favoritesIcon).toBeInTheDocument();
    expect(favoritesIcon).toHaveAttribute('src', expect.stringContaining('fav_ico.png'));

    const favoritesCount = screen.getByText(mockFavorites.length.toString());
    expect(favoritesCount).toBeInTheDocument();
  });

  it('renders correct favorites count when there are no favorites', () => {
    useCharacters.mockReturnValue({ favorites: [] });

    render(<Header />);

    const favoritesCount = screen.getByText('0');
    expect(favoritesCount).toBeInTheDocument();
  });

  it('contains a link to the favorites page', () => {
    useCharacters.mockReturnValue({ favorites: [] });

    render(<Header />);

    const favoritesLink = screen.getByRole('link', { name: /Favorites/i });
    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });

  it('contains a link to the homepage', () => {
    useCharacters.mockReturnValue({ favorites: [] });

    render(<Header />);

    const homeLink = screen.getByRole('link', { name: /Marvel Logo/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
