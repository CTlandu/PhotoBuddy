
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-m5ocddyzhqndhe7x.us.auth0.com"
      clientId='B2XOe0G0BdbujW0PqBo2ppdINusJW5yq'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      
      <App />
    </Auth0Provider>
  </React.StrictMode>
);