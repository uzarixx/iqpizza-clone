import React, { FC } from 'react';
import styles from './Footer.module.scss';
import ArrowBack from '../../ui/icons/ArrowBack';
import StatusRestaurant from '../../ui/other/StatusRestaurant';
import { useAppSelector } from '../../../store/store';
import { Link } from 'react-router-dom';
import Facebook from '../../ui/icons/Facebook';
import Instagram from '../../ui/icons/Instagram';


const Footer: FC = () => {
  const isDelivery = localStorage.getItem('isDelivery') === 'true';
  const restaurant = useAppSelector((root) => root.visualSlice.restaurant);

  const onClickScroll = () => {
    const element = document.getElementById('scroll-to-top-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo} onClick={onClickScroll}>
            <img
              src='https://iq-pizza.eatery.club/storage/iq-pizza/setting/image/15/d425b2e046729fd833f75cfd5fa18659.png'
              alt='logo' />
          </div>
          <div className={styles.footerScrollTop} onClick={onClickScroll}>
            Повернутися на верх
            <ArrowBack />
          </div>
        </div>
        <div className={styles.footerBody}>
          <div className={styles.footerBodyLeft}>
            <p>{isDelivery ? 'Доставка' : 'Самовивіз'}</p>
            <StatusRestaurant closedAt={restaurant.closedAt} openAt={restaurant.openAt} />
            <div className={styles.contacts}>
              <Link to={'tel:+380681151010'}>+380 (68) 115 10 10</Link>
              <Link to={'tel:+380981151010'}>+380 (98) 115 10 10</Link>
            </div>
            <div className={styles.bankCards}>
              <img
                src='data:image/png;base64,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'
                alt='bank-master' />
              <img
                src='data:image/png;base64,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'
                alt='bank-visa' />
            </div>
          </div>
          <div className={styles.footerBodyRight}>
            <div className={styles.socialNetworks}>
              <Link target={'_blank'} to={'https://www.facebook.com/iqpizza/reviews/'}><Facebook /></Link>
              <Link target={'_blank'} to={'https://www.instagram.com/iq_pizza_ukraine/'}><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2023 IQ Pizza.</p>
          <Link target={'_blank'} to={'https://www.eatery.club/privacy_policy.pdf'}>Політики конфіденційності і обробка персональних даних</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;