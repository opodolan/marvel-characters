import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CharacterProvider, useCharacters } from '../providers/CharacterProvider';

test('manages characters and favorites state', () => {
  const { result } = renderHook(() => useCharacters(), { wrapper: CharacterProvider });

  // Initial states
  expect(result.current.characters).toEqual([]);
  expect(result.current.favorites).toEqual([]);

  // Add a character to favorites
  const character = { id: 1, name: 'Spider-Man' };
  act(() => {
    result.current.addFavorite(character);
  });
  expect(result.current.favorites).toEqual([character]);

  // Remove a character from favorites
  act(() => {
    result.current.removeFavorite(character.id);
  });
  expect(result.current.favorites).toEqual([]);
});
