import s from './index.module.css';
import cn from 'classnames';
import { ReactComponent as FavIcon } from './img/fav.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { ReactComponent as LogIcon } from './img/log.svg'
import { ReactComponent as ChartsIcon } from './img/charts.svg';
import { ReactComponent as AddProd } from './img/addProduct.svg';


import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { useTranslation } from 'react-i18next'

function Header({ children}) {
  const {favorites} = useContext(CardContext);
  const location = useLocation();
  const {isAuthentificated,setActiveModal} = useContext(UserContext);

  const { i18n } = useTranslation();
  const [lang, setLang] = useState('Ru');

  const changeLanguage = () => {
    const lang = localStorage.getItem('lang') ?? 'Ru';
    const newLang = lang === 'Ru' ? 'En' : 'Ru'
    i18n.changeLanguage(newLang);
    setLang(newLang)
    localStorage.setItem('lang', newLang);
  }

  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
        <div className={s.wrapper}>
          {children}
          <div className={s.iconsMenu}>
          {isAuthentificated ? (
              <><Link to={'/profile'} className={s.favoritesLink}>
                <ProfileIcon />
              </Link>
              <Link to={'/addProduct'} className={s.favoritesLink}>
                <AddProd />
              </Link></>
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
          <Link to={'/chart'} className={s.chart} >
              <ChartsIcon />
            </Link>
          <span className={s.lang} onClick={()=>changeLanguage()}>{lang}</span>
        </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
