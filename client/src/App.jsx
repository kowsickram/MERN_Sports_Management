// App.js

import React from 'react';
import {  Route, Routes, HashRouter, } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Player/Login';
import Navbar from './Components/NavBar';
import ContactUs from './Pages/ContactUs';
import My_Sports from './Pages/Player/My-Sports';
import Sport from './Pages/Sports';
import Player_Reg from './Pages/Player/Register';
import Events from './Pages/Events';

import Master_Dashboard from './Pages/Master_Dash';
import MasterLogin from './Pages/Master/Login';
import SportsList from './Pages/Master/SportsList';

export default function App() {
  return (
    <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/std-reg" element={<Player_Reg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/all-sports" element={<Sport />} />
            <Route path="/my-sports" element={<My_Sports />} />
            <Route path="/events" element={<Events />} />
            {/* Master */}
            <Route path='/master-login' element={<MasterLogin />} />
            <Route path='/master' element={<Master_Dashboard />} />
            <Route path='/sportlist' element={<SportsList />} />
          </Routes>
    
      </HashRouter>
  );
};

