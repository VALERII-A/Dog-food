import cn from "classnames";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './index.css'


export const Modal = ({ children, activeModal, setActiveModal }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const Path = location.state?.backgroundLocation;
  console.log(Path.pathname);

useEffect(()=>{
 
},[]);

  return (
      <div className={cn('modal', {['active']: activeModal})} onClick={()=>{setActiveModal(false) ; navigate(Path) }}>
      <div className={cn('modal_content', {['active']: activeModal})} onClick={e=> e.stopPropagation()}>{children}</div>
    </div>
  );
};