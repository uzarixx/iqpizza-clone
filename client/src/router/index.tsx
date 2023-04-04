import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/semantical/header';
import Address from '../components/pages/address';
import Home from '../components/pages/home';
import Popups from '../components/popups';
import Order from '../components/pages/order';
import ScrollToTop from '../components/layouts/scroolToTop';
import Edit from '../components/pages/profile/edit';
import Favorites from '../components/pages/profile/favorites';
import Orders from '../components/pages/profile/history';
import Footer from '../components/semantical/footer';


const Router: FC = () => {

  return (
    <>
      <ScrollToTop />
      <Popups />
      <Header />
      <Routes>
        <Route path={'/address'} element={<Address />} />
        <Route path={'/order'} element={<Order />} />
        <Route path={'*'} element={<Home />} />
        <Route path={'/profile/edit'} element={<Edit />} />
        <Route path={'/profile/favorites'} element={<Favorites />} />
        <Route path={'/profile/history'} element={<Orders />} />
      </Routes>
    </>
  );
};

export default Router;