
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import { openNotification } from '../Notification/Notification';
import s from './index.module.css';


export const AddProduct = () => {

    
    
    
        const { register, handleSubmit, formState:{errors} } = useForm();
        const sendData = async (data) => {
          console.log(data);
          try {
           const result = await api.addProduct(data);
           openNotification('success', 'Success', 'Товар успешно добавлен');
          } catch (error) {
             openNotification('error', 'Error', 'Не получилось добавить товар');
             console.log(error);
          }};
    
        return (
            <form onSubmit={handleSubmit(sendData)}>
             <h3>Добавить продукт</h3>
             <input
                className={s.input}
                type='text'
                placeholder='Введите url картинки'
                {...register('pictures',{ required: 'Обязательное поле', minLength: {value:3, message:'Минимум 3 буквы'}})}
              />
              <div>{errors?.pictures && <p className={s.errorText}>{errors?.pictures?.message}</p>}</div>
             <input
                className={s.input}
                type='text'
                placeholder='Название'
                {...register('name',{ required: 'Обязательное поле', minLength: {value:3, message:'Минимум 3 буквы'}})}
              />
              <div>{errors?.name && <p className={s.errorText}>{errors?.name?.message}</p>}</div>
              <input
                className={s.input}
                type='number'
                placeholder='Цена'
                {...register('price',{ required: 'Обязательное поле', minLength: {value:1, message:'Минимум 1 цифра'}})}
              />
              <div>{errors?.price && <p className={s.errorText}>{errors?.price?.message}</p>}</div>
              <input
                className={s.input}
                type='text'
                placeholder='Описание'
                {...register('description',{ required: 'Обязательное поле', minLength: {value:3, message:'Минимум 3 буквы'}})}
              />
              <div>{errors?.description && <p className={s.errorText}>{errors?.description?.message}</p>}</div>
              <button className={s.button}> Отправить </button>
           </form>
            )
    
    


    
};

