import React, { FC, useState } from 'react';
import styles from './LoginPopup.module.scss';
import PopupLayout from '../../layouts/popupLayout';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useAnimationPopup } from '../../../hooks/useAnimationPopup';
import { setLoginPopup, setRegistrationPopup } from '../../../store/counter/popupSlice';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../../ui/inputs/formInput';
import PrimaryButton from '../../ui/buttons/primaryButton';
import Close from '../../ui/icons/Close';
import SubmitPolicy from '../../ui/buttons/submitPolicy';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../../utils/validation/authValidation';
import UserFetchService from '../../../services/http/userFetchService';
import { fetchUser } from '../../../store/counter/userSlice';
import { fetchFavorites } from '../../../store/counter/productsSlice';

interface IForm {
  email: string;
  password: string;
}

const LoginPopup: FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);
  const isActive = useAppSelector((root) => root.popupSlice.loginPopup);
  const closeDispatch = () => {
    dispatch(setLoginPopup(false));
  };
  const { active, onClosePopup } = useAnimationPopup({ isActive, closeDispatch });

  const onClickRegistration = () => {
    closeDispatch();
    dispatch(setRegistrationPopup(true));
  };
  const methods = useForm<IForm>({ resolver: yupResolver(loginValidation) });
  const onSubmit: SubmitHandler<IForm> = async (props) => {
    try {
      const { data } = await UserFetchService.login(props.email, props.password);
      localStorage.setItem('token', data.token);
      dispatch(fetchUser());
      dispatch(fetchFavorites());
      closeDispatch();
    } catch (e: any) {
      setError(e.response.data.message.message);
    }
  };
  return (
    <PopupLayout active={active} onClosePopup={onClosePopup}>
      <div onMouseDown={(e) => e.stopPropagation()}>
        <form onSubmit={methods.handleSubmit(onSubmit)}
              className={`${styles.loginPopupWrapper} ${active && styles.loginPopupActive}`}>
          <FormProvider {...methods}>
            <p className={styles.title}>Вхід на сайт</p>
            <div className={styles.closeButton} onClick={onClosePopup}>
              <Close />
            </div>
            <span className={styles.desc}>Подаруємо подарунок на день народження, збережемо адресу доставки і розповімо про акції</span>
            <FormInput name={'email'} placeholder={'Введіть свою пошту'} title={'Ваша пошта*'}
                       error={methods.formState.errors} />
            <FormInput name={'password'} placeholder={'Введіть свій пароль'} title={'Ваш пароль*'}
                       error={methods.formState.errors} type={'password'} />
            <SubmitPolicy setChecked={setChecked} checked={checked} />
            <PrimaryButton isDefault={checked && methods.watch('email').length >= 10} onClick={() => {
            }}
                           type={'submit'}>Продовжити</PrimaryButton>
            {error && <b>{error}</b>}
            <b onClick={onClickRegistration}>Реєстрація</b>
          </FormProvider>
        </form>
      </div>
    </PopupLayout>
  );
};

export default LoginPopup;