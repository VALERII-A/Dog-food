import React from 'react';
import { useContext } from 'react';
import CardList from '../../components/CardList/card-list';
import { CardContext } from '../../context/cardContext';

export const CatalogPage = ({ handleProductLike , currentUser }) => {
  const {cards} = useContext (CardContext)
  return (
    <>
      <div className='content__cards'>
        <CardList
        cards={cards}
        currentUser={currentUser}
          onProductLike={handleProductLike}
        />
      </div>
    </>
  );
};
