import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetail from '../pages/CharacterDetail';
import { CharacterProvider } from '../providers/CharacterProvider';
import { getCharacterById, getComicsByCharacterId } from '../services/marvelService';

// Mock the service functions
jest.mock('../services/marvelService', () => ({
  getCharacterById: jest.fn(),
  getComicsByCharacterId: jest.fn(),
}));

const character = {
  id: '1',
  name: 'Spider-Man',
  description: 'A superhero with spider-like abilities.',
  thumbnail: { path: 'path/to/thumbnail', extension: 'jpg' },
};

const comics = [
  {
    id: '101',
    title: 'Amazing Spider-Man #1',
    thumbnail: { path: 'path/to/comic1', extension: 'jpg' },
    dates: [{ date: '2020-01-01T00:00:00Z' }],
  },
  {
    id: '102',
    title: 'Amazing Spider-Man #2',
    thumbnail: { path: 'path/to/comic2', extension: 'jpg' },
    dates: [{ date: '2021-01-01T00:00:00Z' }],
  },
];

describe('CharacterDetail', () => {
  beforeEach(() => {
    // Mock implementations
    getCharacterById.mockResolvedValue(character);
    getComicsByCharacterId.mockResolvedValue(comics);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading initially', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterProvider>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </CharacterProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders character details and comics', async () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterProvider>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </CharacterProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(character.name)).toBeInTheDocument());

    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.description)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toHaveAttribute('src', `${character.thumbnail.path}.${character.thumbnail.extension}`);

    expect(screen.getByText(comics[0].title)).toBeInTheDocument();
    expect(screen.getByText(comics[1].title)).toBeInTheDocument();
  });

  test('toggles favorite state', async () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterProvider>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </CharacterProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(character.name)).toBeInTheDocument());
  });
});
