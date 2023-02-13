import cn from 'classnames';
import s from './index.module.scss';

const BaseButton = ({children, color, ...props})=> {
    return (
        <button {...props} className={cn(s.btn, s[color])}>
            {children}
            </button>
    )
};
export default BaseButton;