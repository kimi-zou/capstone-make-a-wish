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
  const [imgIndex, setImgIndex] = useState(0);

  // Get all wishes
  const getAllWishesFunc = async () => {
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
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

  // Set img index
  const setIndex = (up, wish) => {
    if (!wish) return;
    if (up === 1) {
      if (imgIndex === wish.WishImages.length - 1) {
        setImgIndex(0);
      } else {
        setImgIndex(imgIndex + 1);
      }
    } else {
      if (imgIndex === 0) {
        setImgIndex(wish.WishImages.length - 1);
      } else {
        setImgIndex(imgIndex - 1);
      }
    }
  };

  return (
    <WishContext.Provider value={{
      updateStatus,
      makeWishPublic,
      makeWishPrivate,
      getAllWishesFunc,
      setIndex,
      showCreateWishForm,
      showWishDetail,
      showConfirmation,
      confirmHeading,
      confirmMessage,
      confirmHandler,
      cancelHandler,
      confirmButtonText,
      imgIndex,
      setShowCreateWishForm,
      setShowWishDetail,
      setShowConfirmation,
      setConfirmHeading,
      setConfirmMessage,
      setConfirmHandler,
      setCancelHandler,
      setConfirmButtonText,
      setImgIndex
    }}
    >
      {children}
    </WishContext.Provider>
  );
};

export default WishContextProvider;
