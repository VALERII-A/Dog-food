import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import './style.scss'
import s from './index.module.css';
import { openNotification } from "../../components/Notification/Notification";
import { CardContext } from "../../context/cardContext";

export const EditProduct = () => {
    const { productId } = useParams();
    const {setCards} = useContext(CardContext)
    const [product, setProduct] = useState();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    const navigate = useNavigate()

    const minLetter = 'Минимум 3 буквы'
    const minNumber = 'Минимум 1 цифра'

    const validationRules = {
      pictures: {
        required: 'Обязательное поле',
        minLength: { value: 3, message: minLetter }
      },
      name: {
        required: 'Обязательное поле',
        minLength: { value: 3, message: minLetter }
      },
      price: {
        required: 'Обязательное поле',
        minLength: { value: 1, message: minNumber }
      },
      discount: {
        // required: 'Обязательное поле',
        minLength: { value: 1, message: minNumber }
      },
      stock: {
        required: 'Обязательное поле',
        minLength: { value: 1, message: minNumber }
      },
      wight: {
        required: 'Обязательное поле',
        minLength: { value: 2, message: 'Минимум 2 символа' }
      },
      description: {
        required: 'Обязательное поле',
        minLength: { value: 3, message: minLetter }
      }
    };
  
    const sendData = async (data) => {
        try {
           const newProducts = await api.editProductById(productId, {...product,
                pictures: data.pictures ,
                name: data.name,
                price: data.price,
                discount: data.discount,
                stock: data.stock,
                wight: data.wight,
                description: data.description})
           setCards((state) => state.map(e => e._id === newProducts._id ? newProducts : e))
         openNotification('success', 'Success', 'Товар успешно отредактирован');
        } catch (error) {
           openNotification('error', 'Error', 'Не получилось отредактировать товар');
           console.log(error);
        }};

        const deleteProductById = async (productId) => {
            try {
              const newProducts = await api.deleteProductById(productId)
              setCards((state) => state.filter((product) => product._id !== productId))
             openNotification('success', 'Success', 'Товар успешно удален');
             navigate('/')
            } catch (error) {
               openNotification('error', 'Error', 'Не получилось удалить товар');
               console.log(error);
            }};


            useEffect(() => {
              if (product) {
                  reset({
                    pictures: product.pictures ,
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
                    stock: product.stock,
                    wight: product.wight,
                    description: product.description
                  });
              }
          }, [product]);

    useEffect(() => {
        api
            .getProductById(productId)
            .then((productData) => setProduct(productData))
            .catch((err) => {console.log(err)})
    }, [productId]);

    return (<>
        <form onSubmit={handleSubmit(sendData)}>
         <h3>Редактировать продукт</h3>
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
                className='textarea'
                type='text'
                placeholder='Описание'
                {...register('description', {...validationRules.description})}
              />
              <div>{errors?.description && <p className={s.errorText}>{errors?.description?.message}</p>}</div>
          <button className={s.button}> Сохранить </button>
       </form>
       <button className={s.button}onClick={() => deleteProductById(productId)}> 
         Удалить 
       </button></>
        )
}