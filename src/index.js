import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/app';
import { BrowserRouter } from 'react-router-dom';
import './components/App/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </Provider>
);

