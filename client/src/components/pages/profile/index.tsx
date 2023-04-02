import { FC } from 'react';
import styles from './Profile.module.scss';
import ProfileBar from '../../ui/asides/profileBar';

const Profile: FC = ({ children }) => {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.left}>
        <h2>Особистий кабінет</h2>
        <ProfileBar />
      </div>
      <div className={styles.contentMain}>
        {children}
      </div>
    </div>
  );
};

export default Profile;