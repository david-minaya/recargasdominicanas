import axios from 'axios';
import React, { ChangeEvent, Fragment, useEffect, useMemo, useRef } from 'react';
import { Field, useAsyncEffect, validators } from '@recargas-dominicanas/core/utils';
import { FieldError, Icon } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './image-picker.module.css';

interface Props {
  field?: Field<File | undefined>,
  required?: boolean,
  image?: string
  style?: Style
}

export function ImagePicker(props: Props) {

  const {
    field,
    required = false,
    image,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const uploadInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (required) field?.addValidators([validators.required]);
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
    if (image && !field?.value) return `${process.env.IMAGES_DOMAIN}/${image}`;
    if (field?.value) return URL.createObjectURL(field?.value);
  }, [field?.value, image]);

  function handleClick() {
    uploadInput.current?.click();
  }

  function handleUploadInputChange(event: ChangeEvent<HTMLInputElement>) {
    field?.update(event.target.files?.[0]);
  }

  return (
    <div className={style.container}>
      <div className={style.title}>Imagen</div>
      <div 
        className={style.content}
        onClick={handleClick}>
        {!image && !field?.value &&
          <Fragment>
            <Icon
              className={style.icon} 
              icon='image'/>
            <div 
              className={style.placeholder}>
              Seleccionar imagen
            </div>
          </Fragment>
        }
        {(image || field?.value) &&
          <img
            className={style.image}
            src={objectUrlImage}/>
        }
      </div>
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
