import React, { FC } from 'react';
import styles from './ProfileBar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBack from '../../icons/ArrowBack';
import EditProfile from '../../icons/EditProfile';
import HeartIco from '../../icons/HeartIco';
import Ticket from '../../icons/Ticket';
import Exit from '../../icons/Exit';
import { useAppDispatch } from '../../../../store/store';
import { setUser } from '../../../../store/counter/userSlice';
import UserFetchService from '../../../../services/http/userFetchService';
import { setFavorites } from '../../../../store/counter/productsSlice';

const ProfileBar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];
  console.log(path);
  const onLogout = async () => {
    dispatch(setUser(null));
    dispatch(setFavorites([]));
    await UserFetchService.logout();
    localStorage.removeItem('token')
    navigate('/');
  };
  return (
    <aside className={styles.aside}>
      <ul className={styles.list}>
        <li><Link to={'/'}><ArrowBack />Повернутися назад</Link></li>
        <li className={`${path === 'edit' && styles.active}`}><Link to={'/profile/edit'}><EditProfile />Редагувати
          профіль</Link></li>
        <li className={`${path === 'favorites' && styles.active}`}><Link to={'/profile/favorites'}><HeartIco />Обрані
          товари</Link></li>
        <li className={`${path === 'history' && styles.active}`}><Link to={'/profile/history'}><Ticket />Історія замовлень</Link>
        </li>
        <li onClick={onLogout}><Exit />Вихід</li>
      </ul>
    </aside>
  );
};

export default ProfileBar;