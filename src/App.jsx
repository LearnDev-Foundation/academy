import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { Home, Profile } from "./Containers";
import { PageNotFound, Password, Recovery, Register, Reset, Username } from "./Components";

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<Register />} path="/register" />
          <Route element={<Profile/>} path="/profile" />
          <Route element={<PageNotFound/>} path="*" />
          <Route element={<Password/>} path="/password" />
          <Route element={<Recovery/>} path="/recovery" />
          <Route element={<Reset/>} path="/reset" />
          <Route element={<Username/>} path="/username" />
        </Routes>
      </HashRouter>

      <CookieConsent>This site uses cookies. By continuing to use this website, you agree to their use.</CookieConsent>
    </div>
  )
}

export default App