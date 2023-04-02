import React, { FC, useState } from 'react';
import styles from './RegistrationPopup.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useAnimationPopup } from '../../../hooks/useAnimationPopup';
import { setLoginPopup, setRegistrationPopup } from '../../../store/counter/popupSlice';
import PopupLayout from '../../layouts/popupLayout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Close from '../../ui/icons/Close';
import FormInput from '../../ui/inputs/formInput';
import PrimaryButton from '../../ui/buttons/primaryButton';
import SubmitPolicy from '../../ui/buttons/submitPolicy';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationValidation } from '../../../utils/validation/authValidation';
import UserFetchService from '../../../services/http/userFetchService';
import { fetchUser } from '../../../store/counter/userSlice';


interface IForm {
  phoneNumber: string;
  email: string;
  name: string;
  password: string;
}

const RegistrationPopup: FC = () => {
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((root) => root.popupSlice.registrationPopup);
  const closeDispatch = () => {
    dispatch(setRegistrationPopup(false));
  };
  const { active, onClosePopup } = useAnimationPopup({ isActive, closeDispatch });
  const onClickLogin = () => {
    closeDispatch();
    dispatch(setLoginPopup(true));
  };
  const methods = useForm<IForm>({ resolver: yupResolver(registrationValidation) });
  const onSubmit: SubmitHandler<IForm> = async (props) => {
    try {
      await UserFetchService.registration(props.email, props.password, props.name, props.phoneNumber);
      dispatch(fetchUser());
      closeDispatch();
    } catch (e: any) {
      console.log(e.response.data.message);
      setError(e.response.data.message);
    }
  };

  return (
    <PopupLayout active={active} onClosePopup={onClosePopup}>
      <div onMouseDown={(e) => e.stopPropagation()}
           className={`${styles.registrationPopupWrapper} ${active && styles.registrationPopupActive}`}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider  {...methods}>
            <p className={styles.title}>Реєстрація на сайті</p>
            <div className={styles.closeButton} onClick={onClosePopup}>
              <Close />
            </div>
            <FormInput name={'email'} placeholder={'Введіть свою пошту'} title={'Ваша пошта*'}
                       error={methods.formState.errors} type={'email'} />
            <FormInput name={'phoneNumber'} placeholder={'Введіть свію телефон'} title={'Ваш телефон*'}
                       error={methods.formState.errors} type={'text'} />
            <FormInput name={'name'} placeholder={'Введіть своє ім\'я'} title={'Ваше ім\'я*'}
                       error={methods.formState.errors} type={'text'} />
            <FormInput name={'password'} placeholder={'Введіть пароль'} title={'Ваш пароль*'}
                       error={methods.formState.errors} type={'password'} />
            <SubmitPolicy setChecked={setChecked} checked={checked} />
            <PrimaryButton isDefault={checked} onClick={() => {
            }} type={'submit'}>Продовжити</PrimaryButton>
            {error && <b>{error}</b>}
            <b onClick={onClickLogin}>Вхід</b>
          </FormProvider>
        </form>
      </div>
    </PopupLayout>
  );
};

export default RegistrationPopup;