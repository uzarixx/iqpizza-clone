import * as yup from 'yup';

export const orderValidation = yup.object().shape({
  name: yup.string().min(4, 'Введіть дійсне ім\'я').max(25, 'Введіть дійсне ім\'я').required('Це поле є обов\'язковим'),
  phoneNumber: yup.string().matches(/^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/, 'Невірний формат телефону').required('Це поле є обов\'язковим'),
  userAmount: yup.string().matches(/^\d+$/, 'Введіть суму')
});