import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import './style.scss'
import s from './index.module.css';
import { openNotification } from "../../components/Notification/Notification";

export const EditProduct = () => {

    const [product, setProduct] = useState();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { productId } = useParams();

    const sendData = async (data) => {
        try {
            await api.editProductById(productId, {...product,
                pictures: data.pictures ,
                name :data.name,
                price :data.price,
                description :data.description})
         openNotification('success', 'Success', 'Товар успешно отредактирован');
        } catch (error) {
           openNotification('error', 'Error', 'Не получилось отредактировать товар');
           console.log(error);
        }};

        const deleteProductById = async (productId) => {
            try {
                await api.deleteProductById(productId)
             openNotification('success', 'Success', 'Товар успешно удален');
            } catch (error) {
               openNotification('error', 'Error', 'Не получилось удалить товар');
               console.log(error);
            }};


            useEffect(() => {
              if (product) {
                  reset({
                      pictures: product.pictures,
                      name: product.name,
                      price: product.price,
                      description: product.description,
                  });
              }
          }, [product]);

    useEffect(() => {
        api
            .getProductById(productId)
            .then((productData) => setProduct(productData))
            .catch((err) => {
            })
    }, [productId]);

    return (<>
        <form onSubmit={handleSubmit(sendData)}>
         <h3>Редактировать продукт</h3>
         <input
            className={s.input}
            type='text'
            placeholder='Введите url картинки'
            // defaultValue={product?.pictures}
            {...register('pictures',{ required: 'Обязательное поле', minLength: {value:3, message:'Минимум 3 буквы'}})}
          />
          <div>{errors?.pictures && <p className={s.errorText}>{errors?.pictures?.message}</p>}</div>
         <input
            className={s.input}
            type='text'
            placeholder='Название'
            // defaultValue={product?.name}
            {...register('name',{ required: 'Обязательное поле', minLength: {value:3, message:'Минимум 3 буквы'}})}
          />
          <div>{errors?.name && <p className={s.errorText}>{errors?.name?.message}</p>}</div>
          <input
            className={s.input}
            type='number'
            placeholder='Цена'
            // defaultValue={product?.price}
            {...register('price',{ required: 'Обязательное поле', minLength: {value:1, message:'Минимум 1 цифра'}})}
          />
          <div>{errors?.price && <p className={s.errorText}>{errors?.price?.message}</p>}</div>
          <textarea
            className='textarea'
            type='text'
            placeholder='Описание'
            // defaultValue={product?.description}
            {...register('description',{ required: 'Обязательное поле', minLength: {value:3, message:'Минимум 3 буквы'}})}
          />
          <div>{errors?.description && <p className={s.errorText}>{errors?.description?.message}</p>}</div>
          <button className={s.button}> Сохранить </button>
       </form>
       <button className={s.button}onClick={() => deleteProductById(productId)}> 
         Удалить 
       </button></>
        )
}