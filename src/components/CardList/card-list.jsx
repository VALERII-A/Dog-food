import Card from '../Card/card';
import './index.css';


const CardList = ({ onProductLike, cards=[],currentUser }) => {
  return (
    <div className='cards'>
      {cards.map((item ) => (
        <Card
          key={item._id}
          {...item}
          currentUser={currentUser}
          onProductLike={onProductLike}
        />
      ))}
    </div>
  );
};

export default CardList;
