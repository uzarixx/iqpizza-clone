import { FC } from 'react';
import styles from './PrimaryButton.module.scss';

interface props {
  isDefault: boolean;
  onClick: any;
  type?: 'submit'
}

const PrimaryButton: FC<props> = ({ isDefault, onClick, children, type }) => {
  return (
    <button type={type || 'button'} className={`${isDefault ? styles.default : styles.disabled}`} disabled={!isDefault} onClick={onClick}>{children}</button>
  );
};
export default PrimaryButton;