import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchUsers } from '../../store/search';
import useOutsideClick from '../../services/useOutsideClick';
import SearchResult from '../SearchResult';
import './index.css';

const Search = () => {
  const ref = useRef();
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
  useOutsideClick(ref, () => {
    setSearchKeyword('');
    setShowMenu(false);
  });

  // Handle search
  useEffect(() => {
    if (searchKeyword) dispatch(searchUsers(searchKeyword));
  }, [dispatch, searchKeyword]);

  // Render
  return (
    <div className='search' ref={ref}>
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
