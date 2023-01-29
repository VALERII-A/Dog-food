import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/product';
import Spinner from '../../components/Spinner';
import { UserContext } from '../../context/userContext';
import api from '../../utils/api';


export const ProductPage = ({ currentUser }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { handleProductLike } = useContext(UserContext);


  const onProductLike = () => {
    handleProductLike(product);
  };

  const { productId } = useParams();


  

  useEffect(() => {
    setIsLoading(true);
    // api.getUserInfo().then((userData) => setCurrentUser(userData));
    api
      .getProductById(productId)
      .then((productData) => setProduct(productData))
      .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <>
    <p>1233</p>
      <div className='content__cards'>
        {isLoading ? (
          <Spinner />
        ) : (
          <Product
            {...product}
            currentUser={currentUser}
            onProductLike={onProductLike}
          />
        )}
      </div>
    </>
  );
};
