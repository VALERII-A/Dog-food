import s from './index.module.css';
import cn from 'classnames';
import { ReactComponent as FavIcon } from './img/fav.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { ReactComponent as LogIcon } from './img/log.svg'
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';

function Header({ children, user, onUpdateUser}) {
  // const handleClickButtonEdit = (e) => {
  //   e.preventDefault();
  //   onUpdateUser({ about: 'Ментор', name: "Александр" });
  // };

  const {favorites} = useContext(CardContext);
  const location = useLocation();
  const {isAuthentificated,setActiveModal} = useContext(UserContext);
  

  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
      
        {/* <span>{user?.about} </span>
        <span>{user?.email} </span>

        <button className='btn' onClick={handleClickButtonEdit}>
          Change
        </button> */}

        <div className={s.wrapper}>
          {children}
          <div className={s.iconsMenu}>
          {isAuthentificated ? (
              <Link to={'/profile'} className={s.favoritesLink}>
                <ProfileIcon />
              </Link>
            ) : (
              <Link
                to={'/login'}
                className={s.favoritesLink}
                onClick={() => setActiveModal(true)}
                state={{
                  backgroundLocation: location,
                  initialPath: location.pathname,
                }}>
                {<LogIcon />}
              </Link>
            )}
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
