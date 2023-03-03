import cn from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import './index.css'


export const Modal = ({ children, activeModal, setActiveModal }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.backgroundLocation;



  return (
      <div className={cn('modal', {['active']: activeModal})} onClick={()=>{setActiveModal(false) ; navigate(path) }}>
      <div className={cn('modal_content', {['active']: activeModal})} onClick={e=> e.stopPropagation()}>{children}</div>
    </div>
  );
};