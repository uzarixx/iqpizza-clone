import { FC, useEffect, useState } from 'react';
import styles from './OrderLayout.module.scss';
import OrderFetchService from '../../../../services/http/orderFetchService';
import { date } from '../../../../utils/date';
import ArrowBack from '../../../ui/icons/ArrowBack';
import { useAppDispatch } from '../../../../store/store';
import { setOrderPopup } from '../../../../store/counter/popupSlice';
import NotResultCard from '../../../ui/cards/notResultCard';

interface IOrder {
  id: number,
  address: string,
  isDelivery: boolean,
  createdAt: string,
  orderPrice: number;
  status: string
}

export const fetchOrdersHistory = async () => {
  const { data } = await OrderFetchService.getAllOrder();
  return data;
};
const HistoryLayout: FC = () => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<Array<IOrder>>([]);
  useEffect(() => {
    fetchOrdersHistory().then((r) => setOrders(r));
  }, []);
  const onClickOrder = (id: number) => () => {
    dispatch(setOrderPopup({ orderId: id, active: true }));
  };

  if (!orders.length) {
    return (
      <NotResultCard title={'У вас немає замовлень'} subtitle={'Поки-що у вас немає замовлень'}/>
    );
  }

  return (
    <div className={styles.historyWrapper}>
      {orders.map((el) =>
        <div key={el.id} className={styles.orderWrapper} onClick={onClickOrder(el.id)}>
          <div className={styles.top}>
            <div className={styles.left}>
              <p>{el.isDelivery ? 'Доставка на' : 'IQ Pizza на'} {el.address}</p>
              <span>вул. {el.address}</span>
            </div>
            <div className={styles.right}>
              <p>{el.orderPrice} ₴</p>
              <span>{el.status}</span>
            </div>
          </div>
          <div className={styles.bottom}>
            <span>{date(el.createdAt)}</span>
            <button>Детальніше <ArrowBack /></button>
          </div>
        </div>,
      )}
    </div>
  );
};

export default HistoryLayout;