import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Navbar from './components/Navbar.tsx';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
