import { createContext } from 'react';
import io from 'socket.io-client';

export const socket = io();
export const socketContext = createContext();

export const emitFriendRequest = (actionUserId) => {
  socket.emit('send friend request', actionUserId);
};
