import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchResultUser from '../SearchResultUser';

const SearchResult = () => {
  const users = useSelector(state => state.search.users);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (users) setLoaded(true);
  }, [users]);

  if (!loaded) return null;

  return (
    <div className='search-result'>
      {
        users.length === 0
          ? <div>No users found.</div>
          : (
            <div>
              {
                users.map((user) => {
                  return <SearchResultUser user={user} key={user.id} />;
                })
              }
            </div>
            )
        }
    </div>
  );
};

export default SearchResult;
