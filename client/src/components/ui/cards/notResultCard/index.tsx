import { FC } from 'react';
import styles from './NotResultCard.module.scss';
import NotResult from '../../icons/NotResult';

interface props {
  title: string,
  subtitle: string
}
const NotResultCard: FC<props> = ({ title, subtitle }) => {
  return (
    <div className={styles.wrapper}>
      <NotResult />
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default NotResultCard;