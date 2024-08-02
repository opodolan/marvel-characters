import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacters } from '../providers/CharacterProvider';
import { getCharacterById, getComicsByCharacterId } from '../services/marvelService';
import favIco from "../assets/images/fav_ico.png";
import favIcoUnselected from "../assets/images/fav_ico.unselected.png";
import Header from '../components/Header';
import '../styles/CharacterDetail.scss';

const CharacterDetail = () => {
  const { id } = useParams();
  const { addFavorite, removeFavorite, favorites } = useCharacters();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState(null);
  
  const isFavorite = favorites.some((fav) => fav?.id === character?.id);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacterById(id);
        setCharacter(data || []);
      } catch (error) {
        console.error('Failed to fetch character:', error);
        setCharacter([]);
      }
    };
    fetchCharacter();
  }, [id]);
  
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await getComicsByCharacterId(id);
        setComics(data || []);
      } catch (error) {
        console.error('Failed to fetch comics:', error);
        setComics([]);
      }
    };
    fetchComics();
  }, [id]);

  const onFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };
  
  const getYear = (data) => {
    return data.split('-')[0];
  }

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-detail-container">
      <Header></Header>
      <div className="character-header">
        <img
          src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
          alt={character.name}
          className="character-image"
        />
        <div className="character-info">
          <div className="character-details">
            <span className="character-name">{character.name}</span>
            <img src={isFavorite ? favIco : favIcoUnselected} className="favorite-icon" onClick={onFavoriteToggle} />
          </div>
          <p className="character-description">{character.description}</p>
        </div>
      </div>
      <h2 className="comics-title">Comics</h2>
      <div className="comics-list shadow-scroll-x">
        {comics?.map((comic, index) => (
          <div key={index} className="comic-item">
            {comic.thumbnail ? (
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.name}
                className="comic-image"
              />
            ) : (
              <div className="comic-placeholder">No Image Available</div>
            )}
            <p className="comic-title">{comic.title}</p>
            <p className="comic-year">{getYear(comic.dates[0].date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterDetail;
