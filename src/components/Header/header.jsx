import s from './index.module.css';
import cn from 'classnames';

function Header({ children, user, onUpdateUser }) {
  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({ about: 'Старатель', name: "Сиф" });
  };
  

  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
      
        <span>{user?.about} </span>
        <span>{user?.email} </span>

        <button className='btn' onClick={handleClickButtonEdit}>
          Change
        </button>

        <div className={s.wrapper}>{children}</div>
      </div>
    </header>
  );
}

export default Header;
