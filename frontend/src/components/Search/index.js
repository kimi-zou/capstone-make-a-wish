import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../../store/search';
import SearchResult from '../SearchResult';

const Search = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Handle open menu
  useEffect(() => {
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
    openMenu();
  }, [searchKeyword, showMenu]);

  // Handle close menu
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  // Handle search
  useEffect(() => {
    if (searchKeyword) dispatch(searchUsers(searchKeyword));
  }, [dispatch, searchKeyword]);

  // Render
  return (
    <div className='search'>
      <button className='search__submit'>
        <input
          className='search__input'
          placeholder='Search'
          type='text'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}

        />
        <i className='fas fa-search' />
      </button>
      {showMenu && searchKeyword !== '' && (
        <SearchResult />
      )}
    </div>
  );
};

export default Search;
