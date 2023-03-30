import { ChangeEvent, FC, useState } from 'react';
import styles from './File.module.scss';
import FilePin from '../../icons/FilePin';
import Delete from '../../icons/Delete';

interface props {
  setImages?: (e: File[]) => void;
}

const File: FC<props> = ({ setImages }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileArray = [];
    const file = e.target.files;
    if (file) fileArray.push(...file);
    if (!file) return;
    if (fileArray.map((e) => e.type.match(/image-*/)).includes(null)) {
      return;
    }
    if (files.length >= 3) return;
    setFiles(files.concat(...fileArray.slice(0, 3)));
    setImages && setImages(files.concat(...fileArray.slice(0, 3)));
  };

  const onDeleteFile = (index: number) => () => {
    setFiles(files.filter((_, i) => i !== index));
    setImages && setImages(files.filter((_, i) => i !== index));
  };
  return (
    <div className={styles.fileUploaderWrapper}>
      <label htmlFor={'uploader'}>
        <FilePin />
        <p>Прикріпити фото</p>
        <input type={'file'} multiple id={'uploader'} accept={'image/*, .heic'}
               onChange={(e) => fileHandler(e)} />
      </label>
      {files.length >= 1 && <div className={styles.gallery}>
        {files.slice(0, 3).map((el: File, i: number) =>
          <div className={styles.imageWrapper} onClick={onDeleteFile(i)} key={i}>
            <Delete />
            <img width={52} height={52} src={URL.createObjectURL(el)} alt='test' />
          </div>,
        )}
      </div>}
    </div>
  );
};
export default File;