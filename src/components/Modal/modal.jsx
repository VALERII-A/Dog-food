import cn from "classnames";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './index.css'


export const Modal = ({ children, activeModal, setActiveModal }) => {

  const navigate = useNavigate();

useEffect(()=>{
 
},[]);

  return (
      <div className={cn('modal', {['active']: activeModal})} onClick={()=>{setActiveModal(false) ; navigate('/') }}>
      <div className={cn('modal_content', {['active']: activeModal})} onClick={e=> e.stopPropagation()}>{children}</div>
    </div>
  );
};
