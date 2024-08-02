import React from 'react';
import { Link } from 'react-router-dom';
import favIco from "../assets/images/fav_ico.png";
import favIcoUnselected from "../assets/images/fav_ico.unselected.png";
import { useCharacters } from '../providers/CharacterProvider';
import '../styles/CharacterCard.scss';

const CharacterCard = ({ character }) => {
  const { addFavorite, removeFavorite, favorites } = useCharacters();
  const isFavorite = favorites?.some((fav) => fav.id === character.id);

  const onFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <div className="character-card" data-testid="character-card">
      <Link to={`/characters/${character.id}`} className='character-image-wrapper'>
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} className="character-image" width="200" height="200" />
      </Link>
      <div className="character-details">
        <span className="character-name">{character.name}</span>
        <img src={isFavorite ? favIco : favIcoUnselected} className="favorite-icon" onClick={onFavoriteToggle} />
      </div>
    </div>
  );
};

export default CharacterCard;
