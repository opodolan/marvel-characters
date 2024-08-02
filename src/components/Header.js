import React from 'react';
import favIco from "../assets/images/fav_ico.png";
import marvelLogo from "../assets/images/marvel_logo.png";
import { useCharacters } from '../providers/CharacterProvider';
import '../styles/Header.scss';

const Header = () => {
 const { favorites } = useCharacters();
 
  return (
   <header>
    <a href='/'>
     <img src={marvelLogo} alt="Marvel Logo" className="logo" />
    </a>
    <div className="favorites-icon">
      <a href='/favorites'>
        <img src={favIco} alt='Favorites' />
      </a>
      <span className='count'>{favorites?.length}</span>
    </div>
   </header>
  );
};

export default Header;
