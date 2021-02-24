import { createContext } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { getAllNotifications } from '../store/notification';

export const socket = io();
export const socketContext = createContext();

export const emitFriendRequest = (actionUserId) => {
  socket.emit('send friend request', actionUserId);
};

// Receive friend request
export const onFriendRequest = (sessionUser, dispatch) => {
  socket.on('receive friend request', (notification) => {
    if (notification.notificationReceiver.receiverId !== sessionUser.id) return;
    toast.error(`Received a friend request from ${notification.actionUser.displayName}!`);
    dispatch(getAllNotifications(sessionUser.id));
  });
};

// Receive friend accept
export const onFriendAccept = (sessionUser, dispatch) => {
  socket.on('accept friend request', (notification) => {
    if (notification.notificationReceiver.receiverId !== sessionUser.id) return;
    toast.error(`${notification.actionUser.displayName} has accepted your friend request!`);
    dispatch(getAllNotifications(sessionUser.id));
  });
};
