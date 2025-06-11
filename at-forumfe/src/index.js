import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import Header from './components/header';
import Footer from './components/footer';
import AppRoutes from './router/AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main style={{ paddingTop: '64px' }}>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
