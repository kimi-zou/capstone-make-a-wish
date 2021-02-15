import React, { useState } from 'react';

export const DashboardContext = React.createContext();

const DashboardContextProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [showMonths, setShowMonths] = useState(true);

  return (
    <DashboardContext.Provider value={{
      showMonths,
      setShowMonths,
      friends,
      setFriends
    }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
