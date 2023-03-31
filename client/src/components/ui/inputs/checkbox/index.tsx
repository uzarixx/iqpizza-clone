import { FC } from 'react';
import styles from './Checkbox.module.scss';
import CheckBox from '../../icons/CheckBox';

interface props {
  setChecked: (v: boolean) => void;
  isActive: boolean;
}

const Checkbox: FC<props> = ({ setChecked, isActive }) => {
  const onClickChecked = () => {
    setChecked(!isActive);
  };
  return (
    <div className={styles.checkbox} onClick={onClickChecked}>
      <span className={`${styles.checked} ${isActive && styles.checkedActive}`}><CheckBox /></span>
    </div>
  );
};
export default Checkbox;