import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardList from "../../components/CardList/card-list";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

export const Favorite = ({ currentUser })=> {

 const {favorites  } = useContext(CardContext);
 const { handleProductLike } = useContext(UserContext);
 const navigate = useNavigate();

    return (
        <>
         <span className='profile__back' onClick={()=>{navigate(-1)}}>
                {'< Назад'}
            </span>
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