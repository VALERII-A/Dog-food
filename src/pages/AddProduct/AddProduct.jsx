
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { useForm } from 'react-hook-form';
import { openNotification } from '../../components/Notification/Notification';
import api from '../../utils/api';

import s from './index.module.css';


export const AddProduct = () => {

  const validationRules = {
    pictures: {
      required: 'Обязательное поле',
      minLength: { value: 3, message: 'Минимум 3 буквы' }
    },
    name: {
      required: 'Обязательное поле',
      minLength: { value: 3, message: 'Минимум 3 буквы' }
    },
    price: {
      required: 'Обязательное поле',
      minLength: { value: 1, message: 'Минимум 1 цифра' }
    },
    discount: {
      required: 'Обязательное поле',
      minLength: { value: 1, message: 'Минимум 1 цифра' }
    },
    stock: {
      required: 'Обязательное поле',
      minLength: { value: 1, message: 'Минимум 1 цифра' }
    },
    wight: {
      required: 'Обязательное поле',
      minLength: { value: 2, message: 'Минимум 2 символа' }
    },
    description: {
      required: 'Обязательное поле',
      minLength: { value: 3, message: 'Минимум 3 буквы' }
    }
  };
         
        const {setCards} = useContext(CardContext)
    
        const { register, handleSubmit,reset, formState:{errors} } = useForm(); 
        
        const sendData = async (data) => {
          try {
           const result = await api.addProduct(data);
           setCards((state) => [...state, result])
           reset()
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
                type='string'
                placeholder='Введите url картинки'
                {...register('pictures', {...validationRules.pictures})}
              />
              <div>{errors?.pictures && <p className={s.errorText}>{errors?.pictures?.message}</p>}</div>
             <input
                className={s.input}
                type='string'
                placeholder='Название'
                {...register('name', {...validationRules.name})}
              />
              <div>{errors?.name && <p className={s.errorText}>{errors?.name?.message}</p>}</div>
              <input
                className={s.input}
                type='number'
                placeholder='Цена'
                {...register('price', {...validationRules.price})}
              />
              <div>{errors?.price && <p className={s.errorText}>{errors?.price?.message}</p>}</div>
              <input
                className={s.input}
                type='number'
                placeholder='Скидка'
                {...register('discount', {...validationRules.discount})}
              />
              <div>{errors?.discount && <p className={s.errorText}>{errors?.discount?.message}</p>}</div>
              <input
                className={s.input}
                type='number'
                placeholder='Количесво'
                {...register('stock', {...validationRules.stock})}
              />
              <div>{errors?.stock && <p className={s.errorText}>{errors?.stock?.message}</p>}</div>
              <input
                className={s.input}
                type='string'
                placeholder='Вес'
                {...register('wight', {...validationRules.wight})}
              />
              <div>{errors?.wight && <p className={s.errorText}>{errors?.wight?.message}</p>}</div>
              <textarea
                className={s.textarea}
                type='text'
                placeholder='Описание'
                {...register('description', {...validationRules.description})}
              />
              <div>{errors?.description && <p className={s.errorText}>{errors?.description?.message}</p>}</div>
              <button className={s.button}> Отправить </button>
           </form>
            )    
};

