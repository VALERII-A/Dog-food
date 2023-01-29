import { useState, useEffect } from 'react';
// import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.css';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import { ProductPage } from '../../pages/product/product';
import { CatalogPage } from '../../pages/catalog/catalog';
import { Route, Routes } from 'react-router-dom';
import { NoMatchFound } from '../../pages/NoMatchFound/NoMatchFound';
import useDebounce from '../../hooks/useDebounce';
import { UserContext } from '../../context/userContext';
import { FaqPage } from '../../pages/faq/faq-page';
import { Favorite } from '../../pages/favorites/favorites';
import { isLiked } from '../../utils/utils';
import { CardContext } from '../../context/cardContext';
import RegistrationForm from '../Form/RegistrationForm';
import { Modal } from '../Modal/modal';


function App() {
  const [cards, setCards] = useState([]);  // карточки
  const [searchQuery, setSearchQuery] = useState('');  // реагирует на запросы.поисковой запрос
  const [currentUser, setCurrentUser] = useState(null);  // текущ пользователь
  const [favorites, setFavorites] = useState([]);
  // const [view, setView] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [contacts, setContacts] = useState([]);


  const debounceSearchQuery = useDebounce(searchQuery, 1000);  // накопл знач запроса серч

  const handleRequest = () => {
    // const filterCards = cards.filter((item) =>
    //   item.name.toUpperCase().includes(searchQuery.toUpperCase())
    // );
    // setCards(filterCards);

    api
      .search(searchQuery)
      .then((res) => setCards(res))
      .catch((err) => console.log(err));
  };  // фильр-ый запрос по поиску

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }; // обработка отправки формы

  // const handleInputChange = (inputValue) => {
  //   setSearchQuery(inputValue);
  // }; // обраб измен вход-х дан-х

  // const context = UserContext();

  const sortedData = (currenSort) => {
    switch (currenSort) {
      case 'expensive': setCards([...cards.sort((a,b)=> b.price - a.price )]);  break;
      case 'cheep': setCards([...cards.sort((a,b)=> a?.price - b?.price )]);  break;
      case 'newest': setCards([...cards.sort((a,b)=> new Date(b?.created_at) - new Date(a?.created_at) )]);  break;
      case 'popular': setCards([...cards.sort((a,b)=> b?.likes?.length - a?.likes?.length )]);  break;
      default:
        setCards([...cards.sort((a,b)=> a.price - b.price )]);
        break;
    }
  };

  const valueProvider = {
    cards,
    favorites,
    onSortData: sortedData,
  };
  const userProvider = {
    handleProductLike ,
     currentUser
  };

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    // api.createContact(contact)
  };


  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUser) => {
      setCurrentUser(newUser);
    });
  }  // изменен дан пользователя

  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser?._id);
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;});
        if (!liked) {
          setFavorites((prevState) => [... prevState, newCard]);
        } else setFavorites ((prevState) => prevState.filter((card) => card._id !== newCard._id));
      setCards(newProducts);
    });
  }  // лайки


  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]); // выз обраб-ки запр-са посл изм-я дебаунс

  useEffect(() => {
    Promise.all([api.getProductsList(), api.getUserInfo()]).then(
      ([productsData, userData]) => {
        setCards(productsData.products);
        setCurrentUser(userData);
        const favProducts = productsData.products.filter((product) =>
        isLiked(product.likes, userData._id));
      setFavorites(favProducts);
      }
    );
  }, []); // сет карт и юзер


  return (
    <>
    <CardContext.Provider value={valueProvider}>
    <UserContext.Provider value={userProvider}>
      <Header user={currentUser} onUpdateUser={handleUpdateUser} setActiveModal={setActiveModal}>
        <>
          <Logo className='logo logo_place_header'/>
          <Routes>
            <Route path='/'
              element={ <Search
                  onSubmit={handleFormSubmit}
                  onInput={setSearchQuery} />}
            ></Route>
          </Routes>
        </>
      </Header>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
              <div style={{ width: '300px', height: '300px' }}>
                <RegistrationForm addContact={addContact} />
              </div>
            </Modal>

      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery} />
        <Routes>
          <Route path='/'
            element={ <CatalogPage
                cards={cards}
                currentUser={currentUser}
                handleProductLike={handleProductLike} />}
          ></Route>
          <Route path='/product/:productId' element={<ProductPage currentUser={currentUser}/>}></Route>
          <Route path='/faq' element={<FaqPage />}></Route>
          <Route path='/favorites' element={<Favorite currentUser={currentUser}/>}></Route>
          <Route path='*' element={<NoMatchFound />}></Route>
          <Route path='/registrationForm' element={<RegistrationForm/>}></Route>
        </Routes>
      </main>
      <Footer />
      
    </UserContext.Provider> 
    </CardContext.Provider> 
    </>
  );
}

export default App;
