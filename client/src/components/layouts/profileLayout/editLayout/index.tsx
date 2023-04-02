import { FC } from 'react';
import styles from './Edit.module.scss';
import { useAppSelector } from '../../../../store/store';
import Info from '../../../ui/icons/Info';

const EditLayout: FC = () => {
  const user = useAppSelector((root) => root.userSlice.user);
  return (
    <div className={styles.editWrapper}>
      <div className={styles.userBlockFirst}>
        <div className={styles.userImg}>
          <img src={'https://iq-pizza.eatery.club/storage/iq-pizza/setting/image/10443/man.png'} alt={'user-image'} />
        </div>
        <div>
          <span>{user?.user.name}</span>
          <div className={styles.phone}>
          <p>{user?.user.phoneNumber}</p>
            <Info/>
            <div className={styles.tooltip}>
              <p>Щоб змінити номер телефону, зверніться до адміністратора в будь-якому нашому закладі</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLayout;