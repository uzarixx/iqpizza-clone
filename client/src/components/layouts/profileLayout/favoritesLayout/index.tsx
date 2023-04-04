import { FC, useEffect, useState } from 'react';
import styles from './Favorites.module.scss';
import { IProduct } from '../../../../constants/types';
import ProductsFetchService from '../../../../services/http/productsFetchService';
import ProductCard from '../../../ui/cards/productCard';
import { useAppSelector } from '../../../../store/store';;
import NotResultCard from '../../../ui/cards/notResultCard';

export const fetchUserFavorites = async () => {
  const { data } = await ProductsFetchService.getAllFavoriteProducts();
  return data;
};

const FavoritesLayout: FC = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const favorites = useAppSelector((root) => root.productsSlice.favorites)
  const cart = useAppSelector((root) => root.cartSlice.cart);
  useEffect(() => {
    fetchUserFavorites().then((r) => setProducts(r));
  }, [favorites])
  if (!products.length) {
    return (
      <NotResultCard
        title={'У вас немає обраних товарів'}
        subtitle={'Ви можете додати улюблений товар з меню закладу'} />
    );
  }

  return (
    <div className={styles.productsWrapper}>
      {products.map((el) =>
        <ProductCard
          id={el.id}
          imageLink={el.imageLink}
          weight={el.weight}
          name={el.name}
          price={el.price}
          description={el.description}
          stylesMore
          isFavorite
          isSelected={Boolean(cart.find(obj => obj.id === el.id))}
          key={el.id}
        />)
      }
    </div>
  );
};

export default FavoritesLayout;