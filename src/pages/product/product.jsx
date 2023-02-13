import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/product';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';




export const ProductPage = () => {
  const { handleProductLike, currentUser } = useContext(UserContext);
  const { cards } = useContext(CardContext);
  const { productId } = useParams();


  const product = cards.find(card => card._id === productId);
 
 
  const onProductLike = () => {
    handleProductLike(product);
  };


  return (
    <>
      <div className='content__cards'>
          <Product
            {...product}
            currentUser={currentUser}
            onProductLike={onProductLike}
          />
      </div>
    </>
  );
};
