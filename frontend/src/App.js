import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { restoreUser } from './store/session';

import About from './components/Home/About';
import Dashboard from './components/Dashboard';
import Home from './components/Home/Home/index';
import Notification from './components/Notification';
import Settings from './components/Settings';
import Wish from './components/Wish';
import SideNav from './components/Navigation/SideNav';
import TopNav from './components/Navigation/TopNav';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
          </Switch>
          <div className='body'>
            {user && <SideNav />}
            <div className='main'>
              {user && <TopNav />}
              <Switch>
                <Route exact path='/dashboard'>
                  <Dashboard />
                </Route>
                <Route exact path='/my-wishes'>
                  <Wish />
                </Route>
                <Route exact path='/notifications'>
                  <Notification />
                </Route>
                <Route exact path='/settings'>
                  <Settings />
                </Route>
              </Switch>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
