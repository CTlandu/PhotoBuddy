
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      // retrieve from auth0 application setting page
      domain="dev-m5ocddyzhqndhe7x.us.auth0.com"
      clientId='B2XOe0G0BdbujW0PqBo2ppdINusJW5yq'
      // useRefreshTokens={true}
      authorizationParams={{
        redirect_uri: window.location.origin+"/profile_test",
        // However, your React application needs to pass an access token when it calls a target API to access private resources. 
        // You can request an access token in a format that the API can verify by passing the audience 
        // and scope props to Auth0Provider as follows:
        audience: "https://dev-m5ocddyzhqndhe7x.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata"
      }}>
      
      <App />
    </Auth0Provider>
  </React.StrictMode>
);