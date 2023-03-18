
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import s from './index.module.css';


export const AddProduct = () => {

    
    
    
        const { register, handleSubmit, formState:{errors} } = useForm();
        const sendData = async (data) => {
          console.log(data);
          try {
          const result = await api.addProduct(data);
          // localStorage.setItem(`token`,result.token);
          // setAuthentificated(true);
          // navigate('/')
          } catch (error) {
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
              <div>{errors?.name && <p className={s.errorText}>{errors?.name?.message}</p>}</div>
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
                {...register('price',{ required: 'Обязательное поле', minLength: {value:1, message:'Минимум 1 цифр'}})}
              />
              <div>{errors?.phoneNumber && <p className={s.errorText}>{errors?.phoneNumber?.message}</p>}</div>
              <input
                className={s.input}
                type='text'
                placeholder='Описание'
                {...register('description',{ required: 'Обязательное поле', minLength: {value:3, message:'Минимум 3 буквы'}})}
              />
              <div>{errors?.password && <p className={s.errorText}>{errors?.password?.message}</p>}</div>
              <button className={s.button}> Отправить </button>
           </form>
            )
    
    


    
};

