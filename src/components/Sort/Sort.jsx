import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CardContext } from '../../context/cardContext';
import './index.scss'


const Sort = () => {
  const {onSortData} = useContext(CardContext);
  const { t } = useTranslation();

  const tabs = [
   {id: 'newest', title: t("newest")},
   {id: 'cheep', title: t("cheep")},
   {id: 'expensive', title: t("expensive")},
   {id: 'popular', title: t("popular") },
];
const handleChange = (id) => {
    onSortData(id);
};


    return (
        <div className="sort"> {tabs.map(({id, title})=>(
            <div key={id} className='sort__link' onClick={()=> handleChange(id)}>{title}</div>
        ))}</div>
    );
};


export default Sort;