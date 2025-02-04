import ReactDOM from 'react-dom/client';  
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';  
import App from './App'; 
import store from './store/store';  

const rootElement = document.getElementById('root') as HTMLElement;  
const root = ReactDOM.createRoot(rootElement);  

root.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
