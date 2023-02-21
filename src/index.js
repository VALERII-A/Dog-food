import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/app';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
