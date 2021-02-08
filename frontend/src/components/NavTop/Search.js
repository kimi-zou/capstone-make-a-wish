import React, { useState } from 'react';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='nav-search'>
      <form className='nav-search__form' onSubmit={handleSubmit}>
        <input
          className='nav-search__input'
          placeholder='Search'
          type='search'
          name='search'
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <button className='nav-search__submit' type='submit'>
          <i className='fas fa-search' />
        </button>
      </form>
    </div>
  );
};

export default Search;
