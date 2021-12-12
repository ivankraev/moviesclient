import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MovieLinkProvider } from './Contexts/MovieLink';
import AuthContextProvider from './Contexts/AuthContext';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MovieLinkProvider>
          <App />
        </MovieLinkProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
