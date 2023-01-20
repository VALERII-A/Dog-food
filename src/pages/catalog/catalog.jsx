import React from 'react';
import CardList from '../../components/CardList/card-list';

export const CatalogPage = ({ cards, currentUser, handleProductLike }) => {
  return (
    <>
      <div className='content__cards'>
        <CardList
          goods={cards}
          currentUser={currentUser}
          onProductLike={handleProductLike}
        />
      </div>
    </>
  );
};
