import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchUsers, loadUserResults } from '../../store/search';
import { getFriends, getSentPendingFriends, getReceivedPendingFriends } from '../../store/friendship';
import useOutsideClick from '../../services/useOutsideClick';
import SearchResult from '../SearchResult';
import './index.css';

const Search = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
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
    const emptyKeyword = searchKeyword.match(/^\s*$/);
    if (!emptyKeyword) {
      dispatch(searchUsers(searchKeyword));
    } else { dispatch(loadUserResults([])); }
  }, [dispatch, searchKeyword]);

  // Get friends and pending requests
  useEffect(() => {
    dispatch(getFriends(sessionUser.id));
    dispatch(getSentPendingFriends(sessionUser.id));
    dispatch(getReceivedPendingFriends(sessionUser.id));
  }, [dispatch, sessionUser]);

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
