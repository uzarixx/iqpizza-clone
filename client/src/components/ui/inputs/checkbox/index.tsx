import { FC, useState } from 'react';
import styles from './Checkbox.module.scss';
import CheckBox from '../../icons/CheckBox';

interface props {
  setChecked: (v: boolean) => void;
}

const Checkbox: FC<props> = ({ setChecked }) => {
  const [active, setActive] = useState(false);
  const onClickChecked = () => {
    setActive(!active);
    setChecked && setChecked(!active);
  };
  return (
    <div className={styles.checkbox} onClick={onClickChecked}>
      <span className={`${styles.checked} ${active && styles.checkedActive}`}><CheckBox /></span>
    </div>
  );
};
export default Checkbox;