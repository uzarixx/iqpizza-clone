import { FC } from 'react';
import styles from './FormInput.module.scss';
import { useFormContext } from 'react-hook-form';

interface IFormInput {
  name: string;
  placeholder: string;
  title: string;
  error?: { [key: string]: any } | undefined;
  type?: "email" | "text" | "password"
}

const FormInput: FC<IFormInput> = ({ name, placeholder, title, error, type }) => {
  const { register } = useFormContext();
  return (
    <div className={styles.inputWrapper}>
      <p>{title}</p>
      <input
        type={type || 'text'}
        {...register(name)}
        placeholder={placeholder}
        className={`${error && error[name] && styles.activeError}`}
      />
      <span className={`${error && error[name] && styles.activeErrorMessage}`}>{error && error[name]?.message}</span>
    </div>
  );
};
export default FormInput;