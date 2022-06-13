import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './Router.scss';
import Home from './pages/Home';
import Admin from './pages/Admin';

import Header from "./components/Header";


function Router() {
  
  const [updateMap, setUpdateMap] = React.useState(1);



  return (
    <>
      <Header setUpdateMap={setUpdateMap} updateMap={updateMap}></Header>
      <Routes>
        <Route path="/" element={<Home setUpdateMap={setUpdateMap} updateMap={updateMap} />} />
        <Route path="/login" element={<Admin />} />
      </Routes>
    </>
  );
}

export default Router;