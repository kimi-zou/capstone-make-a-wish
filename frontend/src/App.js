import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { restoreUser } from './store/session';
import { socketContext, onFriendRequest } from './context/socket';

import About from './components/HomeAbout';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Notification from './components/Notification';
import Settings from './components/Settings';
import Wish from './components/Wish';
import SideNav from './components/NavSide';
import TopNav from './components/NavTop';
import NotificationToast from './components/NotificationToast';

const App = () => {
  const dispatch = useDispatch();
  const socket = useContext(socketContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (!sessionUser) return;
    onFriendRequest();
    return () => {
      socket.off('receive friend request');
    };
  }, [sessionUser, socket]);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <NotificationToast />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
          </Switch>
          {sessionUser &&
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
