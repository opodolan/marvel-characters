import React, { useState } from 'react';
import { useCharacters } from '../providers/CharacterProvider';
import CharacterCard from '../components/CharacterCard';
import Header from '../components/Header';
import Search from '../components/Search';
import '../styles/CharacterList.scss';

const CharacterList = () => {
  const { filteredCharacters } = useCharacters();
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteToggle = (character) => {
    if (favorites.includes(character.id)) {
      setFavorites(favorites.filter((fav) => fav !== character.id));
    } else {
      setFavorites([...favorites, character.id]);
    }
  };

  return (
    <div className="character-list-container">
      <Header></Header>
      <Search
        found={filteredCharacters.length}
        ></Search>
      <div className="character-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isFavorite={favorites.includes(character.id)}
              onFavoriteToggle={() => handleFavoriteToggle(character)}
            />
          ))
        ) : (
          <p>No characters found</p>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
