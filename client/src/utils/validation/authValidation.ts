import * as yup from 'yup';

export const registrationValidation = yup.object().shape({
  name: yup.string().min(4, 'Введіть дійсне ім\'я').max(25, 'Введіть дійсне ім\'я').required('Це поле є обов\'язковим'),
  phoneNumber: yup.string().matches(/^\+?3?8?(?:\s?\(0\d{2}\)\s?|\s?0\d{2}\s?)[\d\s]{7,9}\d$/, 'Невірний формат телефону').required('Це поле є обов\'язковим'),
  email: yup.string().email('Введіть дійсну пошту'),
  password: yup.string().min(4, 'Мінімальна длина паролю - 4 символи').max(40, 'Максимальна длина паролю - 40 символів')
});

export const loginValidation = yup.object().shape({
  email: yup.string().email('Введіть дійсну пошту'),
  password: yup.string().min(4, 'Мінімальна длина паролю - 4 символи').max(40, 'Максимальна длина паролю - 40 символів')
});