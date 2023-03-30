import { FC } from 'react';
import styles from './MenuBar.module.scss';

export const listMenu = [
  { name: 'Піци' },
  { name: 'Напої' },
  { name: 'Бокс-меню' },
  { name: 'Соуси' },
];


const MenuBar: FC = () => {
  return (
    <aside className={styles.menuBar}>
      <h2>Меню</h2>
      <ul>
        {listMenu.map((el, i) =>
          <li key={i}>{el.name}</li>,
        )}
      </ul>
    </aside>
  );
};

export default MenuBar;