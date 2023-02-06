import { useContext } from "react";
import CardList from "../../components/CardList/card-list";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

export const Favorite = ({ currentUser })=> {

 const {favorites  } = useContext(CardContext);
 const { handleProductLike } = useContext(UserContext);

    return (
        <>
        {/* <Link to='/'>
        <button>Назад</button>
        </Link> */}
          <div>
            <h3>Понравилось</h3>
           <div className='content__cards'>
        <CardList
        cards={favorites}
          onProductLike={handleProductLike}
          currentUser={currentUser}
        />
           </div>
          </div>
        </>
    );
};