import React, { FC } from 'react';
import styles from './ReviewEndPopup.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useAnimationPopup } from '../../../hooks/useAnimationPopup';
import PopupLayout from '../../layouts/popupLayout';
import { setReviewEndPopup } from '../../../store/counter/popupSlice';
import Close from '../../ui/icons/Close';



const ReviewEndPopup: FC = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((root) => root.popupSlice.reviewEndPopup);
  const closeDispatch = () => {
    dispatch(setReviewEndPopup(false));
  };
  const { active, onClosePopup } = useAnimationPopup({ isActive, closeDispatch });
  return (
    <PopupLayout active={active} onClosePopup={onClosePopup}>
      <div className={`${styles.reviewEndPopupWrapper} ${active && styles.active}`}
           onClick={(e) => e.stopPropagation()}>
        <span onClick={onClosePopup}>
        <Close />
        </span>
        <h4>Успішно відправлено</h4>
        <h2>Дякуємо за ваш відгук!</h2>
      </div>
    </PopupLayout>
  );
};

export default ReviewEndPopup;