import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCharacters } from '../services/marvelService';

const CharacterContext = createContext();

export const useCharacters = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data || []);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        setCharacters([]);
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character) => {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  };

  const removeFavorite = (characterId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== characterId)
    );
  };

  let filteredFavorites = favorites;
  let filteredCharacters = characters;

  if (searchTerm) {
    filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredFavorites = favorites.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <CharacterContext.Provider
      value={{
        characters,
        favorites,
        filteredFavorites,
        filteredCharacters,
        addFavorite,
        removeFavorite,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
