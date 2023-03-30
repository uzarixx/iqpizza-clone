import { FC } from 'react';
import styles from './PopupLayout.module.scss';

interface props {
  active: boolean;
  onClosePopup: () => void;
}

const PopupLayout: FC<props> = ({ active, onClosePopup, children }) => {
  return (
    <div className={`${styles.popupContainer} ${active && styles.active}`} onClick={onClosePopup}>
      {children}
    </div>
  );
};
export default PopupLayout;