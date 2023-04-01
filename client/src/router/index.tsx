import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/semantical/header';
import Address from '../components/pages/address';
import Home from '../components/pages/home';
import Popups from '../components/popups';
import Order from '../components/pages/order';
import ScrollToTop from '../components/layouts/scroolToTop';


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
      </Routes>
    </>
  );
};

export default Router;