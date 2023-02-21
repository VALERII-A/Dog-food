import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/product';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import api from '../../utils/api';
import { openNotification } from '../../components/Notification/Notification';




export const ProductPage = () => {
  const { handleProductLike, currentUser } = useContext(UserContext);
  const { cards } = useContext(CardContext);
  const { productId } = useParams();
  
  

  const product = cards.find(card => card._id === productId);
 
  const onProductLike = () => {
    handleProductLike(product);
  };

  const onSendReview = async (data) => {
    try {
      const result = await api.addReview(product._id, data);
      openNotification('success', 'Success', 'Ваш отзыв успешно отправлен');
      // setProduct({ ...result });
    } catch (error) {
      openNotification('error', 'Error', 'Не получилось отправить отзыв');
    }
  };
  const deleteReview = async (id) => {
    try {
      const result = await api.deleteReview(product._id, id);
      // setProduct({ ...result });
      openNotification('success', 'Success', 'Ваш отзыв успешно удален');
    } catch (error) {
      openNotification('error', 'Error', 'Не получилось удалить отзыв');
    }
  };

  // useEffect(()=>{
    
  // },[product]);


  return (
    <>
      <div className='content__cards'>
          <Product
            {...product}
            currentUser={currentUser}
            onProductLike={onProductLike}
            // setProduct={setProduct}
            onSendReview={onSendReview}
            deleteReview={deleteReview}
          />
      </div>
    </>
  );
};
