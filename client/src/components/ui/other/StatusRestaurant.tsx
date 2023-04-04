import {FC} from 'react'
import styles from './StatusRestaurant.module.scss'

interface props {
  closedAt: number;
  openAt: number
}

const StatusRestaurant: FC<props> = ({closedAt, openAt}) => {
  const nowHour = new Date().getHours();
  return (
    <div className={styles.statusRestaurant}>
      <span
        className={`${nowHour > openAt && nowHour < closedAt ? styles.isOpen : styles.isClosed}`}></span> Відкрито з {openAt}:00 до {closedAt}:00
    </div>
  )
}

export default StatusRestaurant