import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { Home, Profile, Academy } from "./Containers";
import { Password, Recovery, Register, Reset, Username } from "./Containers";
import { ProtectRoute, AuthorizeUser } from './middleware/auth';

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<Register />} path="/register" />
          <Route element={<Username/>} path="/username" />
          <Route element={<ProtectRoute><Password/></ProtectRoute>} path="/password" />
          <Route element={<ProtectRoute><Recovery /></ProtectRoute>} path="/recovery" />
          <Route element={<ProtectRoute><Reset /></ProtectRoute>} path="/reset" />
          <Route element={<AuthorizeUser><Profile /></AuthorizeUser>} path="/profile" />
          <Route element={<AuthorizeUser><Academy /></AuthorizeUser>} path="/academy" />
        </Routes>
      </HashRouter>

      <CookieConsent>This site uses cookies. By continuing to use this website, you agree to their use.</CookieConsent>
    </div>
  )
}

export default App