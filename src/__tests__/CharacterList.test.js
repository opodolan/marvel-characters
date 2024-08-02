import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { useCharacters } from '../providers/CharacterProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterList from '../pages/CharacterList';

jest.mock('../providers/CharacterProvider', () => ({
  useCharacters: jest.fn(),
}));

const addFavoriteMock = jest.fn();
const removeFavoriteMock = jest.fn();

describe('CharacterList', () => {
  const characters = [
    { id: 1, name: 'Spider-Man',
      thumbnail: { path: 'path/to/image', extension: 'jpg' },
     },
    { id: 2, name: 'Iron Man',
      thumbnail: { path: 'path/to/image', extension: 'jpg' },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders character list', async () => {
    useCharacters.mockReturnValue({ favorites: [], characters: characters, filteredCharacters: characters, addFavorite: addFavoriteMock, removeFavorite: removeFavoriteMock });

    render(
      <Router>
        <CharacterList characters={characters} />
      </Router>
    );

    characters.forEach(async character => {
      expect(await screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});