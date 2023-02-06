import s from './index.module.css';
import cn from 'classnames';
import { ReactComponent as FavIcon } from './img/fav.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';

function Header({ children, user, onUpdateUser , setActiveModal}) {
  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({ about: 'Ментор', name: "Александр" });
  };

  const {favorites} = useContext(CardContext);
  

  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
      
        <span>{user?.about} </span>
        <span>{user?.email} </span>

        <button className='btn' onClick={handleClickButtonEdit}>
          Change
        </button>

        <div className={s.wrapper}>{children}
        <Link to='/login' style={{ cursor: 'pointer' }} onClick={()=>setActiveModal(true)}>Вход</Link>
        <div className={s.iconsMenu}>
          <Link className={s.favoritesLink} to='/favorites'> 
          <FavIcon />
          {favorites.length !==0 && (
          <span className={s.iconBubble} >{favorites.length}</span> 
          )}
          </Link>
        </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
