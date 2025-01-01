import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
