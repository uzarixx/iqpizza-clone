import React, {FC} from 'react'
import styles from './SubmitPolicy.module.scss'
import Checkbox from '../../inputs/checkbox';
import { Link } from 'react-router-dom';

interface props {
  setChecked: (v:boolean) => void;
  checked: boolean;
}

const SubmitPolicy: FC<props> = ({setChecked, checked}) => {
  return (
    <div className={styles.policy}>
      <div>
        <Checkbox setChecked={setChecked} isActive={checked} />
      </div>
      <p>Натиснувши “Продовжити”, ви погоджуєтеся зі
        <Link target={'_blank'} to={'https://www.eatery.club/privacy_policy.pdf'}>
          збором та обробкою персональних даних
        </Link>
      </p>
    </div>
  )
}

export default SubmitPolicy