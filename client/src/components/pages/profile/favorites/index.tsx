import { FC } from 'react';
import FavoritesLayout from '../../../layouts/profileLayout/favoritesLayout';
import Profile from '../index';
import CartButton from '../../../ui/buttons/cartButton';

const Favorites: FC = () => {
  return (
    <Profile>
      <FavoritesLayout />
      <CartButton />
    </Profile>
  );
};

export default Favorites;