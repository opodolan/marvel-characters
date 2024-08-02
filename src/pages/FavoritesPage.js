import React from 'react';
import { useCharacters } from '../providers/CharacterProvider';
import CharacterCard from '../components/CharacterCard';
import Header from '../components/Header';
import Search from '../components/Search';
import '../styles/FavoritesPage.scss';

const FavoritesPage = () => {
  const { filteredFavorites } = useCharacters();

  return (
    <div className='favorites'>
      <Header></Header>
      <h2 className='title'>Favorites</h2>
      <Search
        found={filteredFavorites?.length}
      ></Search>
      <div className="character-list">
        {filteredFavorites.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

