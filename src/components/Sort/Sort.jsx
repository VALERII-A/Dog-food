import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import './index.scss'


const Sort = () => {
  const {onSortData} = useContext(CardContext);
  const tabs = [
   {id: 'newest', title: 'Новинки'},
   {id: 'cheep', title: 'Сначала дешевые'},
   {id: 'expensive', title: 'Сначала дорогие'},
   {id: 'popular', title: 'По популярности' },
];
const handleChange = (id) => {
    onSortData(id);
};

    return (
        <div className="sort"> {tabs.map(({id, title})=>(
            <div className='sort__link' onClick={()=> handleChange(id)}>{title}</div>
        ))}</div>
    );
};


export default Sort;