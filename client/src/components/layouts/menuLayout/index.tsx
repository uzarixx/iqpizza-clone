import { FC, useState } from 'react';
import styles from './MenuLayout.module.scss';
import SearchIco from '../../ui/icons/SearchIco';
import { useAppSelector } from '../../../store/store';
import ProductCard from '../../ui/cards/productCard';
import NotResultCard from '../../ui/cards/notResultCard';

const MenuLayout: FC = () => {
  const [input, setInput] = useState('');
  const cart = useAppSelector((root) => root.cartSlice.cart);
  const products = useAppSelector((root) => root.productsSlice.products);
  const productsArray = products.filter((el) => el.name.toLowerCase().includes(input.toLowerCase()));
  return (
    <div className={styles.menuLayout}>
      <div className={styles.head}>
        <div className={styles.input}>
          <div className={styles.inputWrapper}>
            <SearchIco />
            <input placeholder={'Пошук'} value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
        </div>
        <h3>Піци</h3>
      </div>
      <div className={`${productsArray.length && styles.menuGrid}`}>
        {productsArray.length ? productsArray.map((el) => <ProductCard
            {...el}
            key={el.id}
            isSelected={Boolean(cart.find(obj => obj.id === el.id))} />,
          ) :
          <NotResultCard
            title={'Нічого не знайдено!'}
            subtitle={'На жаль ми не знайшли такої страви у нас. Спробуйте що-небудь інше.'} />}
      </div>
    </div>
  );
};

export default MenuLayout;