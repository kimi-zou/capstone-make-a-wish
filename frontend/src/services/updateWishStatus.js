import { publicWish, privateWish, getPublicWishes, getPrivateWishes } from '../store/wish';

// make wish public
export const makeWishPublic = async (e, dispatch, wish, sessionUser) => {
  e.stopPropagation();
  await dispatch(publicWish(wish.id));
  await dispatch(getPublicWishes(sessionUser.id));
  await dispatch(getPrivateWishes(sessionUser.id));
};

// make wish private
export const makeWishPrivate = async (e, dispatch, wish, sessionUser) => {
  e.stopPropagation();
  await dispatch(privateWish(wish.id));
  await dispatch(getPublicWishes(sessionUser.id));
  await dispatch(getPrivateWishes(sessionUser.id));
};
