import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { restoreUser } from './store/session';
import { socketContext } from './context/socket';
import About from './components/HomeAbout';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Notification from './components/Notification';
import Settings from './components/Settings';
import Wish from './components/Wish';
import SideNav from './components/NavSide';
import TopNav from './components/NavTop';

const App = () => {
  const dispatch = useDispatch();
  const socket = useContext(socketContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    socket.on('receive friend request', (notification) => {
      console.log(notification);
    });
    return () => {
      socket.off('receive friend request');
    };
  }, [socket]);

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
          {user &&
            <div className='body'>
              <SideNav />
              <div className='main'>
                <TopNav />
                <div className='main__main' />
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
            </div>}
        </>
      )}
    </>
  );
};

export default App;
