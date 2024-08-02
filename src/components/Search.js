import React from 'react';
import { useCharacters } from '../providers/CharacterProvider';
import { IoIosSearch } from "react-icons/io";
import '../styles/Search.scss';

const Search = ({ found }) => {
 const { searchTerm, setSearchTerm } = useCharacters();
 
  return (
  <div className='search'>
    <IoIosSearch className='search-icon' />
    <input
    type="text"
    placeholder="Search a character..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='search-input'
    />
    <div className='results'>
      {found}
      <span>results</span>
    </div>
  </div>
  );
};

export default Search;
