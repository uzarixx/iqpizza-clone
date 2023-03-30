import { FC, useState } from 'react';
import styles from './MenuLayout.module.scss';
import SearchIco from '../../ui/icons/SearchIco';
import { useAppSelector } from '../../../store/store';
import ProductCard from '../../ui/cards/productCard';

const MenuLayout: FC = () => {
  const [input, setInput] = useState('');
  const products = useAppSelector((root) => root.productsSlice.products);
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
      <div className={styles.menuGrid}>
        {products.filter((el) => el.name.toLowerCase().includes(input.toLowerCase())).map((el) =>
          <ProductCard {...el} key={el.id} />,
        )}
      </div>
    </div>
  );
};

export default MenuLayout;