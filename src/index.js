import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/app';
import { BrowserRouter } from 'react-router-dom';
import './components/I18next/i18n';
import { Provider } from 'react-redux';
import store from './storageTK/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </Provider>
);

