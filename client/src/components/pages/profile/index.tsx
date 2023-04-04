import React, { FC } from 'react';
import styles from './Profile.module.scss';
import ProfileBar from '../../ui/asides/profileBar';
import Footer from '../../semantical/footer';

const Profile: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <div className={styles.left}>
          <h2>Особистий кабінет</h2>
          <ProfileBar />
        </div>
        <div className={styles.contentMain}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;