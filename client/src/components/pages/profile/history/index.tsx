import { FC } from 'react';
import Profile from '../index';
import HistoryLayout from '../../../layouts/profileLayout/historyLayout';


const History: FC = () => {
  return (
    <Profile>
      <HistoryLayout />
    </Profile>
  );
};

export default History;