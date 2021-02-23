import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPublicWishes,
  getPrivateWishes,
  publicWish,
  privateWish,
  getWish
} from '../store/wish';

export const WishContext = React.createContext();

const WishContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Store state
  const sessionUser = useSelector(state => state.session.user);

  // Local state
  const [showCreateWishForm, setShowCreateWishForm] = useState(false);
  const [showWishDetail, setShowWishDetail] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmHeading, setConfirmHeading] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmHandler, setConfirmHandler] = useState();
  const [cancelHandler, setCancelHandler] = useState();
  const [confirmButtonText, setConfirmButtonText] = useState('');

  // Get all wishes
  const getAllWishesFunc = async () => {
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
  };

  // Handle drag and drop
  // ---Set data for drag event
  const setData = (e, wish) => {
    e.dataTransfer.setData('wishId', wish.id);
    e.dataTransfer.setData('status', wish.status);
  };
  // ---Handle drop
  const dropHandler = async (e) => {
    e.preventDefault();
    const wishId = e.dataTransfer.getData('wishId');
    const status = e.dataTransfer.getData('status');
    if (parseInt(status) === 0) {
      await dispatch(publicWish(wishId));
    } else {
      await dispatch(privateWish(wishId));
    }
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
    await dispatch(getWish(wishId));
  };
  // ---Handle drag over
  const dragoverHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle status update
  // ---make wish public
  const makeWishPublic = async (e, dispatch, wish, sessionUser) => {
    e.stopPropagation();
    await dispatch(publicWish(wish.id));
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
  };
  // ---make wish private
  const makeWishPrivate = async (e, dispatch, wish, sessionUser) => {
    e.stopPropagation();
    await dispatch(privateWish(wish.id));
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
  };
  // ---main function
  const updateStatus = async (e, wish) => {
    if (parseInt(wish.status) === 0) {
      await makeWishPublic(e, dispatch, wish, sessionUser);
    } else {
      await makeWishPrivate(e, dispatch, wish, sessionUser);
    }
    await dispatch(getWish(wish.id));
  };

  return (
    <WishContext.Provider value={{
      dropHandler,
      dragoverHandler,
      setData,
      updateStatus,
      makeWishPublic,
      makeWishPrivate,
      getAllWishesFunc,
      showCreateWishForm,
      showWishDetail,
      showConfirmation,
      confirmHeading,
      confirmMessage,
      confirmHandler,
      cancelHandler,
      confirmButtonText,
      setShowCreateWishForm,
      setShowWishDetail,
      setShowConfirmation,
      setConfirmHeading,
      setConfirmMessage,
      setConfirmHandler,
      setCancelHandler,
      setConfirmButtonText
    }}
    >
      {children}
    </WishContext.Provider>
  );
};

export default WishContextProvider;
