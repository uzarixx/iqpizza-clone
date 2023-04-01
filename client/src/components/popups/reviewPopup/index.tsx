import React, { FC, useState } from 'react';
import styles from './ReviewPopup.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useAnimationPopup } from '../../../hooks/useAnimationPopup';
import PopupLayout from '../../layouts/popupLayout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reviewValidation } from '../../../utils/validation/reviewValidation';
import File from '../../ui/inputs/file/index';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../ui/buttons/primaryButton';
import { useCreateReview } from '../../../hooks/useCreateReview';
import { setReviewEndPopup, setReviewPopup } from '../../../store/counter/popupSlice';
import Checkbox from '../../ui/inputs/checkbox';
import FormInput from '../../ui/inputs/formInput';
import Close from '../../ui/icons/Close';
import Textarea from '../../ui/inputs/textarea';


interface IForm {
  name: string;
  phoneNumber: string;
  reviewText: string;

}

const ReviewPopup: FC = () => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const restaurant = useAppSelector((root) => root.visualSlice.restaurant);
  const isActive = useAppSelector((root) => root.popupSlice.reviewPopup);
  const closeDispatch = () => {
    dispatch(setReviewPopup(false));
  };
  const { active, onClosePopup } = useAnimationPopup({ isActive, closeDispatch });
  const methods = useForm<IForm>({
    resolver: yupResolver(reviewValidation),
  });
  const onSubmit: SubmitHandler<IForm> = async (props) => {
    if (!methods.formState.errors) {
      await useCreateReview(images, props);
      dispatch(setReviewPopup(false));
      dispatch(setReviewEndPopup(true));
    }
  };


  return (
    <PopupLayout active={active} onClosePopup={onClosePopup}>
      <div className={`${styles.reviewPopupWrapper} ${active && styles.active}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <p>Залишити відгук</p>
          <span onClick={onClosePopup}><Close /></span>
        </div>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <h4>IQ Pizza на {restaurant.streetName} {restaurant.streetNumber},
              вул. {restaurant.streetName}, {restaurant.streetNumber}</h4>
            <div className={styles.inputsWrapper}>
              <FormInput
                name={'name'}
                placeholder={'Введіть ваше ім\'я'}
                title={'Ваше ім\'я*'}
                error={methods.formState.errors} />
              <FormInput
                name={'phoneNumber'}
                placeholder={'Введіть телефон'}
                title={'Телефон*'}
                error={methods.formState.errors} />
            </div>
            <Textarea name={'reviewText'} placeholder={'Введіть ваш відгук'} />
            <File setImages={setImages} />
            <div className={styles.bottomForm}>
              <span><Checkbox isActive={checked} setChecked={setChecked} />
                <p>Згоден, з правилами <Link
                  target={'_blank'}
                  to={'https://www.eatery.club/privacy_policy.pdf'}>
                  обробки персональних даних
                </Link>
              </p>
              </span>
              <PrimaryButton
                type={'submit'}
                isDefault={checked && !Boolean(methods.formState.errors.phoneNumber) && !Boolean(methods.formState.errors.name)}
                onClick={onSubmit}>Відправити
                відгук</PrimaryButton>
            </div>
          </FormProvider>
        </form>
      </div>
    </PopupLayout>
  );
};
export default ReviewPopup;