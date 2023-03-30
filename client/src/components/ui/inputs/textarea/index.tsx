import { FC } from 'react';
import styles from './Textarea.module.scss';
import { useFormContext } from 'react-hook-form';

interface ITextarea {
  name: string;
  placeholder: string;
}

const Textarea: FC<ITextarea> = ({ name, placeholder }) => {
  const { register } = useFormContext();
  return (
    <textarea className={styles.textarea} rows={5} placeholder={placeholder} {...register(name)} />
  );
};

export default Textarea;