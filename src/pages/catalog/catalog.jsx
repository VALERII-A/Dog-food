import React from 'react';
import CardList from '../../components/CardList/card-list';
import Sort from '../../components/Sort/Sort';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import './index.css';
import { UserContext } from '../../context/userContext';

export const CatalogPage = ({  currentUser }) => {
  const {cards} = useContext (CardContext);
  const { handleProductLike } = useContext(UserContext);

  return (
    <>
    <div className='catalogPage'>
      <Sort/>
      <div className='content__cards'>
        <CardList
        cards={cards}
        currentUser={currentUser}
          onProductLike={handleProductLike}
        />
        </div>
      </div>
    </>
  );
};
