import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/semantical/header';
import Address from '../pages/address';
import Home from '../pages/home';
import Popups from '../components/ui/popups';


const Router: FC = () => {
  return (
    <>
      <Popups />
      <Header />
      <Routes>
        <Route path={'/address'} element={<Address />} />
        <Route path={'*'} element={<Home />} />
      </Routes>
    </>
  );
};

export default Router;