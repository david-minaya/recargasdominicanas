import axios from 'axios';
import defaultImage from '../../images/upload-image.svg';
import React, { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { Field, useAsyncEffect, validators as Validators } from '@recargas-dominicanas/core/utils';
import { OutlineButton, FieldError } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './upload-image.module.css';

interface Props {
  field?: Field<File | undefined>,
  required?: boolean,
  image?: string
  style?: Style
}

export function UploadImage(props: Props) {

  const {
    field,
    required = false,
    image,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const uploadInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (required) field?.addValidators([Validators.required]);
  }, [required]);

  useEffect(() => {
    return () => field?.addValidators([]);
  }, []);

  useAsyncEffect(async () => {
    if (image) {
      const imageUrl = `${process.env.IMAGES_DOMAIN}/${image}`;
      const response = await axios.get<Blob>(imageUrl, { withCredentials: true, responseType: 'blob' });
      const file = new File([response.data], image, { type: response.data.type });
      field?.update(file);
    }
  });

  const objectUrlImage = useMemo(() => {
    if (!image && !field?.value) return defaultImage;
    if (image && !field?.value) return `${process.env.IMAGES_DOMAIN}/${image}`;
    if (field?.value) return URL.createObjectURL(field?.value);
  }, [field?.value, image]);

  function handleUploadButtonClick() {
    uploadInput.current?.click();
  }

  function handleUploadInputChange(event: ChangeEvent<HTMLInputElement>) {
    field?.update(event.target.files?.[0]);
  }

  return (
    <div className={style.container}>
      <img
        className={style.image}
        src={objectUrlImage}/>
      <OutlineButton
        style={style.uploadButton}
        text={image || field?.value ? 'Cambiar imagen' : 'Subir imagen'}
        onClick={handleUploadButtonClick}/>
      {!field?.isValid &&
        <FieldError
          className={style.error}
          message='Seleccione una imagen'/>
      }
      <input
        className={style.uploadInput}
        type='file'
        accept='.png,.jpg,.jpeg,.svg'
        ref={uploadInput}
        onChange={handleUploadInputChange}/>
    </div>
  );
}
