import { useState, useEffect } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.scss';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import { ProductPage } from '../../pages/product/product';
import { CatalogPage } from '../../pages/catalog/catalog';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NoMatchFound } from '../../pages/NoMatchFound/NoMatchFound';
import useDebounce from '../../hooks/useDebounce';
import { UserContext } from '../../context/userContext';
import { FaqPage } from '../../pages/faq/faq-page';
import { Favorite } from '../../pages/favorites/favorites';
import { isLiked } from '../../utils/utils';
import { CardContext } from '../../context/cardContext';
import RegistrationForm from '../Form/RegistrationForm';
import { Modal } from '../Modal/modal';
import { useCallback } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';


function App() {
  const [isLoading, setIsLoading] = useState(false);


  const [cards, setCards] = useState([]);  // карточки
  const [searchQuery, setSearchQuery] = useState('');  // реагирует на запросы.поисковой запрос
  const [currentUser, setCurrentUser] = useState(null);  // текущ пользователь
  const [favorites, setFavorites] = useState([]);
  // const [view, setView] = useState(false);
  const [activeModal, setActiveModal] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [isAuthentificated, setAuthentificated] = useState(false);


  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser?._id);
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;});
        if (!liked) {
          setFavorites((prevState) => [... prevState, newCard]);
        } else setFavorites ((prevState) => { return prevState.filter((card) => card._id !== newCard._id)});
      setCards(newProducts);
    });
  },[cards, currentUser?._id])  // лайки

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

  const sortedData = (currentSort) => {
    switch (currentSort) {
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
    setCards,
  };
  const userProvider = {
    handleProductLike ,
     currentUser
  };

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    // api.createContact(contact)
  };

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  
  const authRoutes = (<>
  <Route path='/login' element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Login />
          </Modal>}>
  </Route>
  <Route path='/register' element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Register />
          </Modal>}>
  </Route>
  <Route path='/reset-pass' element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <ResetPassword />
          </Modal>}>
  </Route> </>);

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUser) => {
      setCurrentUser(newUser);
    });
  }  // изменен дан пользователя



  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]); // выз обраб-ки запр-са посл изм-я дебаунс

  useEffect(() => {
    setIsLoading(true) 
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

  useEffect(() => {
    const haveToken = localStorage.getItem('token');
    setAuthentificated(!!haveToken);
  }, [activeModal]);


  return (
    <>
    <CardContext.Provider value={valueProvider}>
    <UserContext.Provider value={userProvider}>
      <Header user={currentUser} onUpdateUser={handleUpdateUser} 
       setActiveModal={setActiveModal} isAuthentificated={isAuthentificated}>
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

  
      {/* {isAuthentificated ? ( */}
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery} />
        <Routes location={backgroundLocation && {...backgroundLocation, path:initialPath || location}}>
          <Route path='/'
            element={ <CatalogPage
                cards={cards}
                currentUser={currentUser}
                handleProductLike={handleProductLike} />}
          ></Route>
          <Route path='/product/:productId' element={<ProductPage currentUser={currentUser}/>}></Route>
          <Route path='/faq' element={<FaqPage />}></Route>
          
            <Route path='/favorites' element={
              <PrivateRoute loggedIn={false}>
                <Favorite currentUser={currentUser}/>
              </PrivateRoute>
            }>
            </Route>
          
          <Route path='*' element={<NoMatchFound />}></Route>
          <Route path='/registrationForm' element={<RegistrationForm/>}></Route>
          {authRoutes}
        </Routes>
        {backgroundLocation && <Routes>{authRoutes}</Routes>}

      </main> 
      {/* // ) : ( */}
        {/* // <div className='not-auth'> */}
          {/* Нужно авторизоваться */}
          {/* <Routes>{authRoutes}</Routes> */}
        {/* </div> */}
      {/* // )} */}

      <Footer />
    </UserContext.Provider> 
    </CardContext.Provider> 
    </>
  );
}

export default App;
